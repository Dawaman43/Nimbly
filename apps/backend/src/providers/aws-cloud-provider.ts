import {
  CloudProvider,
  CloudProviderConfig,
  DeploymentRequest,
  DeploymentResult,
  ResourceMetrics,
  CostEstimate,
} from '@nimbly/shared-types';
import {
  EC2Client,
  RunInstancesCommand,
  TerminateInstancesCommand,
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  ModifyInstanceAttributeCommand,
  Instance as EC2Instance,
} from '@aws-sdk/client-ec2';
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} from '@aws-sdk/client-cloudwatch';
import {
  RDSClient,
  CreateDBInstanceCommand,
  DeleteDBInstanceCommand,
  DescribeDBInstancesCommand,
  ModifyDBInstanceCommand,
} from '@aws-sdk/client-rds';
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';

interface AWSProviderConfig extends CloudProviderConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
}

export class AWSCloudProvider extends CloudProvider {
  private ec2Client: EC2Client;
  private cloudWatchClient: CloudWatchClient;
  private rdsClient: RDSClient;
  private s3Client: S3Client;

  constructor(config: AWSProviderConfig) {
    super(config);

    this.ec2Client = new EC2Client({
      region: config.region,
      credentials: config.credentials,
    });

    this.cloudWatchClient = new CloudWatchClient({
      region: config.region,
      credentials: config.credentials,
    });

    this.rdsClient = new RDSClient({
      region: config.region,
      credentials: config.credentials,
    });

    this.s3Client = new S3Client({
      region: config.region,
      credentials: config.credentials,
    });
  }

  getName(): string {
    return 'AWS';
  }

  async deploy(request: DeploymentRequest): Promise<DeploymentResult> {
    try {
      switch (request.action) {
        case 'create':
          return await this.createResource(request);
        case 'update':
          return await this.updateResource(request);
        case 'delete':
          return await this.deleteResource(request);
        case 'scale-up':
        case 'scale-down':
          return await this.scaleResource(request.resourceId, request.config);
        case 'restart':
          return await this.restartResource(request.resourceId);
        default:
          throw new Error(`Unsupported action: ${request.action}`);
      }
    } catch (error) {
      return {
        success: false,
        resourceId: request.resourceId,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async createResource(
    request: DeploymentRequest,
  ): Promise<DeploymentResult> {
    const { resourceId, config } = request;

    switch (config.type) {
      case 'EC2':
        return await this.createEC2Instance(resourceId, config);
      case 'RDS':
        return await this.createRDSInstance(resourceId, config);
      case 'S3':
        return await this.createS3Bucket(resourceId, config);
      default:
        throw new Error(`Unsupported resource type: ${config.type}`);
    }
  }

  private async createEC2Instance(
    resourceId: string,
    config: any,
  ): Promise<DeploymentResult> {
    const command = new RunInstancesCommand({
      ImageId: config.amiId || 'ami-0c55b159cbfafe1d0', // Amazon Linux 2
      MinCount: 1,
      MaxCount: 1,
      InstanceType: this.mapInstanceType(config) as any,
      KeyName: config.keyName,
      SecurityGroupIds: config.securityGroupIds,
      SubnetId: config.subnetId,
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [
            { Key: 'Name', Value: config.name || resourceId },
            { Key: 'ResourceId', Value: resourceId },
          ],
        },
      ],
    });

    const response = await this.ec2Client.send(command);

    return {
      success: true,
      resourceId,
      status: 'successful',
      message: `EC2 instance created: ${response.Instances?.[0]?.InstanceId}`,
      metadata: {
        instanceId: response.Instances?.[0]?.InstanceId,
        instanceType: config.instanceType,
      },
    };
  }

  private async createRDSInstance(
    resourceId: string,
    config: any,
  ): Promise<DeploymentResult> {
    const command = new CreateDBInstanceCommand({
      DBInstanceIdentifier: resourceId
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase(),
      DBInstanceClass: config.instanceClass || 'db.t3.micro',
      Engine: config.engine || 'postgres',
      MasterUsername: config.masterUsername || 'admin',
      MasterUserPassword: config.masterPassword,
      AllocatedStorage: config.allocatedStorage || 20,
      DBName: config.dbName,
      VpcSecurityGroupIds: config.securityGroupIds,
      DBSubnetGroupName: config.dbSubnetGroupName,
      Tags: [
        { Key: 'Name', Value: config.name || resourceId },
        { Key: 'ResourceId', Value: resourceId },
      ],
    });

    await this.rdsClient.send(command);

    return {
      success: true,
      resourceId,
      status: 'successful',
      message: 'RDS instance creation initiated',
      metadata: {
        dbInstanceIdentifier: resourceId
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase(),
      },
    };
  }

  private async createS3Bucket(
    resourceId: string,
    config: any,
  ): Promise<DeploymentResult> {
    const bucketName =
      config.bucketName || `${resourceId.toLowerCase()}-${Date.now()}`;

    const command = new CreateBucketCommand({
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: this.config.region as any,
      },
    });

    await this.s3Client.send(command);

    return {
      success: true,
      resourceId,
      status: 'successful',
      message: `S3 bucket created: ${bucketName}`,
      metadata: {
        bucketName,
      },
    };
  }

  private async updateResource(
    request: DeploymentRequest,
  ): Promise<DeploymentResult> {
    // For now, treat update as scale operation
    return await this.scaleResource(request.resourceId, request.config);
  }

  private async deleteResource(
    request: DeploymentRequest,
  ): Promise<DeploymentResult> {
    const { resourceId, config } = request;

    switch (config.type) {
      case 'EC2':
        return await this.deleteEC2Instance(config.instanceId);
      case 'RDS':
        return await this.deleteRDSInstance(config.dbInstanceIdentifier);
      case 'S3':
        return await this.deleteS3Bucket(config.bucketName);
      default:
        throw new Error(`Unsupported resource type: ${config.type}`);
    }
  }

  private async deleteEC2Instance(
    instanceId: string,
  ): Promise<DeploymentResult> {
    const command = new TerminateInstancesCommand({
      InstanceIds: [instanceId],
    });

    await this.ec2Client.send(command);

    return {
      success: true,
      resourceId: instanceId,
      status: 'successful',
      message: `EC2 instance terminated: ${instanceId}`,
    };
  }

  private async deleteRDSInstance(
    dbInstanceIdentifier: string,
  ): Promise<DeploymentResult> {
    const command = new DeleteDBInstanceCommand({
      DBInstanceIdentifier: dbInstanceIdentifier,
      SkipFinalSnapshot: true,
    });

    await this.rdsClient.send(command);

    return {
      success: true,
      resourceId: dbInstanceIdentifier,
      status: 'successful',
      message: `RDS instance deletion initiated: ${dbInstanceIdentifier}`,
    };
  }

  private async deleteS3Bucket(bucketName: string): Promise<DeploymentResult> {
    const command = new DeleteBucketCommand({
      Bucket: bucketName,
    });

    await this.s3Client.send(command);

    return {
      success: true,
      resourceId: bucketName,
      status: 'successful',
      message: `S3 bucket deleted: ${bucketName}`,
    };
  }

  private async restartResource(resourceId: string): Promise<DeploymentResult> {
    // For EC2 instances, restart means stop and start
    const stopCommand = new StopInstancesCommand({
      InstanceIds: [resourceId],
    });

    await this.ec2Client.send(stopCommand);

    const startCommand = new StartInstancesCommand({
      InstanceIds: [resourceId],
    });

    await this.ec2Client.send(startCommand);

    return {
      success: true,
      resourceId,
      status: 'successful',
      message: `EC2 instance restarted: ${resourceId}`,
    };
  }

  async getResourceStatus(
    resourceId: string,
  ): Promise<'running' | 'stopped' | 'terminated' | 'error'> {
    try {
      // Try EC2 first
      const ec2Command = new DescribeInstancesCommand({
        InstanceIds: [resourceId],
      });

      const ec2Response = await this.ec2Client.send(ec2Command);
      const instance = ec2Response.Reservations?.[0]?.Instances?.[0];

      if (instance) {
        switch (instance.State?.Name) {
          case 'running':
            return 'running';
          case 'stopped':
            return 'stopped';
          case 'terminated':
            return 'terminated';
          default:
            return 'error';
        }
      }

      // Try RDS
      const rdsCommand = new DescribeDBInstancesCommand({
        DBInstanceIdentifier: resourceId,
      });

      const rdsResponse = await this.rdsClient.send(rdsCommand);
      const dbInstance = rdsResponse.DBInstances?.[0];

      if (dbInstance) {
        switch (dbInstance.DBInstanceStatus) {
          case 'available':
            return 'running';
          case 'stopped':
            return 'stopped';
          case 'terminated':
            return 'terminated';
          default:
            return 'error';
        }
      }

      // Assume S3 buckets are always "running" if they exist
      return 'running';
    } catch (error) {
      return 'error';
    }
  }

  async getMetrics(resourceId: string): Promise<ResourceMetrics> {
    // Get CPU and memory metrics from CloudWatch
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 5 * 60 * 1000); // 5 minutes ago

    try {
      // CPU Utilization
      const cpuCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/EC2',
        MetricName: 'CPUUtilization',
        Dimensions: [{ Name: 'InstanceId', Value: resourceId }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 300,
        Statistics: ['Average'],
      });

      const cpuResponse = await this.cloudWatchClient.send(cpuCommand);
      const cpu = cpuResponse.Datapoints?.[0]?.Average || 0;

      // Memory Utilization (if CloudWatch agent is installed)
      const memoryCommand = new GetMetricStatisticsCommand({
        Namespace: 'CWAgent',
        MetricName: 'mem_used_percent',
        Dimensions: [{ Name: 'InstanceId', Value: resourceId }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 300,
        Statistics: ['Average'],
      });

      let ram = 0;
      try {
        const memoryResponse = await this.cloudWatchClient.send(memoryCommand);
        ram = memoryResponse.Datapoints?.[0]?.Average || 0;
      } catch {
        // Memory metrics might not be available
        ram = 0;
      }

      return {
        cpu,
        ram,
        storage: 0, // Would need additional API calls
        networkIn: 0, // Would need additional API calls
        networkOut: 0, // Would need additional API calls
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // Return default metrics if CloudWatch fails
      return {
        cpu: 0,
        ram: 0,
        storage: 0,
        networkIn: 0,
        networkOut: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async estimateCost(
    resourceType: string,
    config: Record<string, any>,
  ): Promise<CostEstimate> {
    // Simplified cost estimation - in production, this would use AWS Pricing API
    const hourlyRate = this.getHourlyRate(resourceType, config);
    const hoursPerMonth = 730; // Average hours in a month

    return {
      resourceId: config.resourceId || 'estimate',
      resourceType,
      hourlyRate,
      monthlyEstimate: hourlyRate * hoursPerMonth,
      currency: 'USD',
      breakdown: {
        compute: hourlyRate * hoursPerMonth,
        storage: 0,
        network: 0,
        other: 0,
      },
      confidence: 0.8,
      lastUpdated: new Date().toISOString(),
    };
  }

  private getHourlyRate(resourceType: string, config: any): number {
    // Simplified pricing - in production, use AWS Pricing API
    switch (resourceType) {
      case 'EC2':
        switch (config.instanceType) {
          case 't3.micro':
            return 0.0104;
          case 't3.small':
            return 0.0208;
          case 't3.medium':
            return 0.0416;
          case 't3.large':
            return 0.0832;
          default:
            return 0.0416; // t3.medium default
        }
      case 'RDS':
        switch (config.instanceClass) {
          case 'db.t3.micro':
            return 0.017;
          case 'db.t3.small':
            return 0.034;
          case 'db.t3.medium':
            return 0.068;
          default:
            return 0.034; // db.t3.small default
        }
      case 'S3':
        return 0.023; // Standard storage per GB/month
      default:
        return 0.05; // Default rate
    }
  }

  async listResources(): Promise<
    Array<{ id: string; name: string; type: string; status: string }>
  > {
    const resources: Array<{
      id: string;
      name: string;
      type: string;
      status: string;
    }> = [];

    try {
      // List EC2 instances
      const ec2Command = new DescribeInstancesCommand({});
      const ec2Response = await this.ec2Client.send(ec2Command);

      ec2Response.Reservations?.forEach((reservation) => {
        reservation.Instances?.forEach((instance) => {
          const nameTag = instance.Tags?.find(
            (tag) => tag.Key === 'Name',
          )?.Value;
          const resourceIdTag = instance.Tags?.find(
            (tag) => tag.Key === 'ResourceId',
          )?.Value;

          resources.push({
            id: resourceIdTag || instance.InstanceId || '',
            name: nameTag || instance.InstanceId || '',
            type: 'EC2',
            status: instance.State?.Name || 'unknown',
          });
        });
      });

      // List RDS instances
      const rdsCommand = new DescribeDBInstancesCommand({});
      const rdsResponse = await this.rdsClient.send(rdsCommand);

      rdsResponse.DBInstances?.forEach((dbInstance) => {
        resources.push({
          id: dbInstance.DBInstanceIdentifier || '',
          name: dbInstance.DBInstanceIdentifier || '',
          type: 'RDS',
          status: dbInstance.DBInstanceStatus || 'unknown',
        });
      });

      // List S3 buckets
      const s3Command = new ListBucketsCommand({});
      const s3Response = await this.s3Client.send(s3Command);

      s3Response.Buckets?.forEach((bucket) => {
        resources.push({
          id: bucket.Name || '',
          name: bucket.Name || '',
          type: 'S3',
          status: 'available',
        });
      });
    } catch (error) {
      // If listing fails, return empty array
      console.error('Failed to list resources:', error);
    }

    return resources;
  }

  async scaleResource(
    resourceId: string,
    newConfig: Record<string, any>,
  ): Promise<DeploymentResult> {
    try {
      // For EC2, change instance type
      if (newConfig.instanceType) {
        const command = new ModifyInstanceAttributeCommand({
          InstanceId: resourceId,
          InstanceType: { Value: newConfig.instanceType },
        });

        await this.ec2Client.send(command);

        return {
          success: true,
          resourceId,
          status: 'successful',
          message: `EC2 instance scaled to ${newConfig.instanceType}`,
        };
      }

      // For RDS, modify instance
      if (newConfig.instanceClass) {
        const command = new ModifyDBInstanceCommand({
          DBInstanceIdentifier: resourceId,
          DBInstanceClass: newConfig.instanceClass,
          ApplyImmediately: true,
        });

        await this.rdsClient.send(command);

        return {
          success: true,
          resourceId,
          status: 'successful',
          message: `RDS instance scaled to ${newConfig.instanceClass}`,
        };
      }

      throw new Error('Unsupported scaling operation');
    } catch (error) {
      return {
        success: false,
        resourceId,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Scaling failed',
      };
    }
  }

  private mapInstanceType(config: any): string {
    // Map our simplified config to AWS instance types
    if (config.instanceType) {
      return config.instanceType;
    }

    // Fallback based on CPU/RAM
    const cpu = config.cpu || 1;
    const ram = config.ram || 1;

    if (cpu === 1 && ram <= 1) return 't3.micro';
    if (cpu === 1 && ram <= 2) return 't3.small';
    if (cpu === 2 && ram <= 4) return 't3.medium';
    if (cpu === 2 && ram <= 8) return 't3.large';

    return 't3.medium'; // Default
  }
}
