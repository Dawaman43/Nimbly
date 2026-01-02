import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CloudResource } from './cloud-resource.entity';
import { CloudProvider, DeploymentRequest } from '@nimbly/shared-types';
import { MockCloudProvider } from '../../providers/mock-cloud-provider';

@Injectable()
export class CloudResourcesService implements OnModuleInit {
  private providers: Map<string, CloudProvider> = new Map();
  private warnedMissingProviders = new Set<string>();

  constructor(
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {
    // Initialize all cloud providers
    const region = process.env.AWS_REGION || 'us-east-1';

    // Mock provider (default)
    this.providers.set(
      'mock',
      new MockCloudProvider({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'mock-key',
          secretAccessKey: 'mock-secret',
        },
      }),
    );

    // AWS provider
    const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (awsAccessKeyId && awsSecretAccessKey) {
      let AWSCloudProviderCtor: any;
      try {
        AWSCloudProviderCtor =
          require('../../providers/aws-cloud-provider').AWSCloudProvider;
      } catch (error) {
        console.warn(
          'AWS provider module unavailable; falling back to mock provider',
          error,
        );
        AWSCloudProviderCtor = undefined;
      }

      if (!AWSCloudProviderCtor) {
        return;
      }
      this.providers.set(
        'aws',
        new AWSCloudProviderCtor({
          region,
          credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
            sessionToken: process.env.AWS_SESSION_TOKEN,
          },
        }),
      );
    }

    // Azure provider
    const azureClientId = process.env.AZURE_CLIENT_ID;
    const azureClientSecret = process.env.AZURE_CLIENT_SECRET;
    const azureTenantId = process.env.AZURE_TENANT_ID;
    if (azureClientId && azureClientSecret && azureTenantId) {
      let AzureCloudProviderCtor: any;
      try {
        AzureCloudProviderCtor =
          require('../../providers/azure-cloud-provider').AzureCloudProvider;
      } catch (error) {
        console.warn(
          'Azure provider module unavailable; falling back to mock provider',
          error,
        );
        AzureCloudProviderCtor = undefined;
      }

      if (!AzureCloudProviderCtor) {
        return;
      }
      this.providers.set(
        'azure',
        new AzureCloudProviderCtor({
          region: process.env.AZURE_REGION || 'eastus',
          credentials: {
            accessKeyId: azureClientId,
            secretAccessKey: azureClientSecret,
          },
        }),
      );
    }

    // GCP provider
    const gcpKeyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (gcpKeyFile) {
      let GCPCloudProviderCtor: any;
      try {
        GCPCloudProviderCtor =
          require('../../providers/gcp-cloud-provider').GCPCloudProvider;
      } catch (error) {
        console.warn(
          'GCP provider module unavailable; falling back to mock provider',
          error,
        );
        GCPCloudProviderCtor = undefined;
      }

      if (!GCPCloudProviderCtor) {
        return;
      }
      this.providers.set(
        'gcp',
        new GCPCloudProviderCtor({
          region: process.env.GCP_REGION || 'us-central1',
          credentials: {
            accessKeyId: 'gcp-service-account',
            secretAccessKey: 'gcp-key',
          },
        }),
      );
    }
  }

  private getProviderForResource(resource: CloudResource): CloudProvider {
    const providerKey = (resource.provider || 'mock').trim();
    const provider = this.providers.get(providerKey);
    if (provider) return provider;

    if (!this.warnedMissingProviders.has(providerKey)) {
      this.warnedMissingProviders.add(providerKey);
      console.warn(
        `Provider ${providerKey} not configured; falling back to mock provider. ` +
          `Set the required credentials/env vars to enable it.`,
      );
    }

    return this.getDefaultProvider();
  }

  private getDefaultProvider(): CloudProvider {
    // Default to mock provider if no specific provider is configured
    return this.providers.get('mock')!;
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
    const provider =
      this.providers.get(resource.provider || 'mock') ||
      this.getDefaultProvider();

    // First, attempt to deploy the resource via cloud provider
    const deploymentRequest: DeploymentRequest = {
      resourceId: resource.id || randomUUID(),
      action: 'create',
      config: {
        name: resource.name,
        type: resource.type,
        cpu: resource.cpu,
        ram: resource.ram,
        storage: resource.storage,
      },
    };

    const deploymentResult = await provider.deploy(deploymentRequest);

    if (!deploymentResult.success) {
      throw new Error(`Failed to deploy resource: ${deploymentResult.message}`);
    }

    // If deployment successful, save to database
    const newResource = this.resourceRepository.create({
      ...resource,
      id: deploymentRequest.resourceId,
      provider: resource.provider || 'mock',
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

    const provider = this.getProviderForResource(resource);
    try {
      return await provider.getMetrics(id);
    } catch (error) {
      // If we fell back to mock provider for a real-provider resource,
      // the mock provider may not have any in-memory state for this resource yet.
      if (
        provider instanceof MockCloudProvider &&
        error instanceof Error &&
        error.message.includes('not found')
      ) {
        await provider.deploy({
          resourceId: resource.id,
          action: 'create',
          config: {
            name: resource.name,
            type: resource.type,
            cpu: resource.cpu,
            ram: resource.ram,
            storage: resource.storage,
          },
        });
        return provider.getMetrics(id);
      }

      throw error;
    }
  }

  async getResourceStatus(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }

    const provider = this.getProviderForResource(resource);
    try {
      return await provider.getResourceStatus(id);
    } catch (error) {
      if (
        provider instanceof MockCloudProvider &&
        error instanceof Error &&
        error.message.includes('not found')
      ) {
        await provider.deploy({
          resourceId: resource.id,
          action: 'create',
          config: {
            name: resource.name,
            type: resource.type,
            cpu: resource.cpu,
            ram: resource.ram,
            storage: resource.storage,
          },
        });
        return provider.getResourceStatus(id);
      }

      throw error;
    }
  }

  async scaleResource(id: string, newConfig: Record<string, any>) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }

    const provider = this.getProviderForResource(resource);
    return provider.scaleResource(id, newConfig);
  }

  async update(
    id: string,
    updateData: Partial<CloudResource>,
  ): Promise<CloudResource> {
    await this.resourceRepository.update(id, updateData);
    const updated = await this.getOne(id);
    if (!updated) {
      throw new Error(`Resource ${id} not found after update`);
    }
    return updated;
  }

  async startResource(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }
    const provider = this.getProviderForResource(resource);
    const result = await provider.deploy({
      resourceId: id,
      action: 'start',
      config: {},
    });
    if (result.success) {
      await this.resourceRepository.update(id, { status: 'running' });
    }
    return result;
  }

  async stopResource(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }
    const provider = this.getProviderForResource(resource);
    const result = await provider.deploy({
      resourceId: id,
      action: 'stop',
      config: {},
    });
    if (result.success) {
      await this.resourceRepository.update(id, { status: 'stopped' });
    }
    return result;
  }

  async restartResource(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }
    const provider = this.getProviderForResource(resource);
    const result = await provider.deploy({
      resourceId: id,
      action: 'restart',
      config: {},
    });
    if (result.success) {
      await this.resourceRepository.update(id, { status: 'running' });
    }
    return result;
  }

  async terminateResource(id: string) {
    const resource = await this.getOne(id);
    if (!resource) {
      throw new Error(`Resource ${id} not found`);
    }
    const provider = this.getProviderForResource(resource);
    const result = await provider.deploy({
      resourceId: id,
      action: 'terminate',
      config: {},
    });
    if (result.success) {
      // Remove from database if terminated successfully
      await this.resourceRepository.delete(id);
    }
    return result;
  }
}
