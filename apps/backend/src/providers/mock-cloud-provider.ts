import { Injectable } from '@nestjs/common';
import { CloudProvider } from '@nimbly/shared-types';
import type {
  CloudProviderConfig,
  DeploymentRequest,
  DeploymentResult,
  ResourceMetrics,
  CostEstimate,
} from '@nimbly/shared-types';

@Injectable()
export class MockCloudProvider extends CloudProvider {
  private resources = new Map<string, any>();
  private deployments = new Map<string, any>();

  constructor(config: CloudProviderConfig) {
    super(config);
  }

  getName(): string {
    return 'MockCloud';
  }

  async deploy(request: DeploymentRequest): Promise<DeploymentResult> {
    const deploymentId = `dep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simulate deployment process
    const result: DeploymentResult = {
      success: Math.random() > 0.1, // 90% success rate
      resourceId: request.resourceId,
      status: 'successful',
      message: `Mock deployment ${request.action} completed`,
      metadata: {
        deploymentId,
        provider: this.getName(),
        region: this.config.region,
        action: request.action,
        config: request.config,
      },
    };

    if (!result.success) {
      result.status = 'failed';
      result.message = 'Mock deployment failed (simulated error)';
    }

    // Store the resource if it's a create action
    if (request.action === 'create') {
      this.resources.set(request.resourceId, {
        id: request.resourceId,
        name: request.config.name || `resource-${request.resourceId}`,
        type: request.config.type || 'EC2',
        status: result.success ? 'running' : 'error',
        createdAt: new Date().toISOString(),
        ...request.config,
      });
    }

    this.deployments.set(deploymentId, {
      id: deploymentId,
      resourceId: request.resourceId,
      action: request.action,
      status: result.status,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      ...result.metadata,
    });

    return result;
  }

  async getResourceStatus(
    resourceId: string,
  ): Promise<'running' | 'stopped' | 'terminated' | 'error'> {
    const resource = this.resources.get(resourceId);
    if (!resource) return 'terminated';

    // Simulate some resources being stopped
    if (Math.random() > 0.8) {
      resource.status = 'stopped';
    }

    return resource.status as 'running' | 'stopped' | 'terminated' | 'error';
  }

  async getMetrics(resourceId: string): Promise<ResourceMetrics> {
    const resource = this.resources.get(resourceId);
    if (!resource) {
      throw new Error(`Resource ${resourceId} not found`);
    }

    // Generate realistic mock metrics
    return {
      cpu: Math.floor(Math.random() * 100),
      ram: Math.floor(Math.random() * 100),
      storage: resource.storage || Math.floor(Math.random() * 1000),
      networkIn: Math.floor(Math.random() * 1000),
      networkOut: Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
    };
  }

  async estimateCost(
    resourceType: string,
    config: Record<string, any>,
  ): Promise<CostEstimate> {
    // Mock cost estimation based on resource type
    const baseRates = {
      EC2: 0.096,
      RDS: 0.25,
      S3: 0.023,
      Lambda: 0.0000167,
    };

    const hourlyRate = baseRates[resourceType as keyof typeof baseRates] || 0.1;
    const monthlyEstimate = hourlyRate * 24 * 30;

    return {
      resourceId: config.resourceId || 'estimated',
      resourceType,
      hourlyRate,
      monthlyEstimate,
      currency: 'USD',
      breakdown: {
        compute: monthlyEstimate * 0.6,
        storage: 0,
        network: monthlyEstimate * 0.1,
        other: monthlyEstimate * 0.3,
      },
      confidence: 0.85,
      lastUpdated: new Date().toISOString(),
    };
  }

  async listResources(): Promise<
    Array<{
      id: string;
      name: string;
      type: string;
      status: string;
    }>
  > {
    return Array.from(this.resources.values()).map((resource) => ({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      status: resource.status,
    }));
  }

  async scaleResource(
    resourceId: string,
    newConfig: Record<string, any>,
  ): Promise<DeploymentResult> {
    const resource = this.resources.get(resourceId);
    if (!resource) {
      return {
        success: false,
        resourceId,
        status: 'failed',
        message: 'Resource not found',
      };
    }

    // Update resource config
    Object.assign(resource, newConfig);
    resource.lastScaled = new Date().toISOString();

    return {
      success: true,
      resourceId,
      status: 'successful',
      message: 'Resource scaled successfully',
      metadata: {
        newConfig,
        scaledAt: resource.lastScaled,
      },
    };
  }
}
