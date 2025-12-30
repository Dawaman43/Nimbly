import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudResource } from './cloud-resource.entity';
import { CloudProvider, DeploymentRequest } from '@nimbly/shared-types';
import { MockCloudProvider } from '../../providers/mock-cloud-provider';
import { AWSCloudProvider } from '../../providers/aws-cloud-provider';

@Injectable()
export class CloudResourcesService implements OnModuleInit {
  private cloudProvider: CloudProvider;

  constructor(
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {
    // Initialize provider based on environment configuration
    const providerType = process.env.CLOUD_PROVIDER || 'mock';
    const region = process.env.AWS_REGION || 'us-east-1';

    if (providerType === 'aws') {
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

      if (!accessKeyId || !secretAccessKey) {
        throw new Error(
          'AWS credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.',
        );
      }

      this.cloudProvider = new AWSCloudProvider({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
          sessionToken: process.env.AWS_SESSION_TOKEN,
        },
      });
    } else {
      // Default to mock provider
      this.cloudProvider = new MockCloudProvider({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'mock-key',
          secretAccessKey: 'mock-secret',
        },
      });
    }
  }

  async onModuleInit() {
    // Don't seed resources - users should create their own
    // New users will start with empty resources
    return;

    // OLD SEEDING CODE - DISABLED
    /*
    const count = await this.resourceRepository.count();
    if (count === 0) {
      // Seed data
      const userId = '550e8400-e29b-41d4-a716-446655440000'; // Fixed UUID for seed user
      const seeds = [
        {
          name: 'app-core-production',
          type: 'EC2',
          spec: 'vCPU 4 / 8GB',
          region: 'us-east-1',
          status: 'running',
          ip: '10.0.1.24',
          cpu: 45,
          ram: 60,
          storage: 120,
          userId,
        },
        {
          name: 'app-core-staging',
          type: 'EC2',
          spec: 'vCPU 2 / 4GB',
          region: 'us-east-1',
          status: 'stopped',
          ip: '10.0.1.25',
          cpu: 0,
          ram: 0,
          storage: 40,
          userId,
        },
        {
          name: 'primary-db-cluster',
          type: 'RDS',
          spec: 'Postgres 15',
          region: 'us-east-1',
          status: 'running',
          ip: '10.0.2.10',
          cpu: 22,
          ram: 45,
          storage: 500,
          userId,
        },
        {
          name: 'assets-bucket-global',
          type: 'S3',
          spec: 'Standard S3',
          region: 'global',
          status: 'running',
          ip: '-',
          cpu: 0,
          ram: 0,
          storage: 1560,
          userId,
        },
        {
          name: 'redis-cache-worker',
          type: 'EC2',
          spec: 'Redis 7',
          region: 'eu-west-2',
          status: 'running',
          ip: '10.0.3.55',
          cpu: 12,
          ram: 85,
          storage: 20,
          userId,
        },
        {
          name: 'load-balancer-main',
          type: 'EC2',
          spec: 'ALB',
          region: 'us-east-1',
          status: 'running',
          ip: '192.168.1.1',
          cpu: 8,
          ram: 15,
          storage: 0,
          userId,
        },
      ];
      // Type casting to map "EC2" to enum if needed, or we adjust seeds to match Entity Enums exactly using "as any"
      await this.resourceRepository.save(seeds as any[]);
    }
    */
  }

  async create(resource: Partial<CloudResource>): Promise<CloudResource> {
    // First, attempt to deploy the resource via cloud provider
    const deploymentRequest: DeploymentRequest = {
      resourceId: resource.id || `res_${Date.now()}`,
      action: 'create',
      config: {
        name: resource.name,
        type: resource.type,
        cpu: resource.cpu,
        ram: resource.ram,
        storage: resource.storage,
      },
    };

    const deploymentResult = await this.cloudProvider.deploy(deploymentRequest);

    if (!deploymentResult.success) {
      throw new Error(`Failed to deploy resource: ${deploymentResult.message}`);
    }

    // If deployment successful, save to database
    const newResource = this.resourceRepository.create({
      ...resource,
      id: deploymentRequest.resourceId,
      status: 'running', // Assume running after successful deployment
    });
    return this.resourceRepository.save(newResource);
  }

  async getAll(userId: string): Promise<CloudResource[]> {
    return this.resourceRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getOne(id: string): Promise<CloudResource | null> {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async getResourceMetrics(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }

    return this.cloudProvider.getMetrics(id);
  }

  async getResourceStatus(id: string) {
    return this.cloudProvider.getResourceStatus(id);
  }

  async scaleResource(id: string, newConfig: Record<string, any>) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }

    return this.cloudProvider.scaleResource(id, newConfig);
  }
}
