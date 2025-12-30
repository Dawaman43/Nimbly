import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deployment } from './deployment.entity';
import { CloudProvider, DeploymentRequest } from '@nimbly/shared-types';
import { CloudResourcesService } from '../cloud-resources/cloud-resources.service';

export type DeploymentState =
  | 'pending'
  | 'in-progress'
  | 'successful'
  | 'failed'
  | 'rolling-back'
  | 'rolled-back';

export interface DeploymentTransition {
  from: DeploymentState;
  to: DeploymentState;
  action: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

@Injectable()
export class DeploymentStateMachine {
  private readonly logger = new Logger(DeploymentStateMachine.name);

  constructor(
    @InjectRepository(Deployment)
    private deploymentsRepository: Repository<Deployment>,
    private cloudResourcesService: CloudResourcesService,
  ) {}

  private readonly validTransitions: Record<
    DeploymentState,
    DeploymentState[]
  > = {
    pending: ['in-progress', 'failed'],
    'in-progress': ['successful', 'failed', 'rolling-back'],
    successful: [], // Terminal state
    failed: ['pending'], // Allow retry
    'rolling-back': ['rolled-back', 'failed'],
    'rolled-back': [], // Terminal state
  };

  async transition(
    deploymentId: string,
    newState: DeploymentState,
    metadata?: Record<string, any>,
  ): Promise<Deployment> {
    const deployment = await this.deploymentsRepository.findOne({
      where: { id: deploymentId },
    });

    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (!this.canTransition(deployment.status as DeploymentState, newState)) {
      throw new Error(
        `Invalid transition from ${deployment.status} to ${newState} for deployment ${deploymentId}`,
      );
    }

    const transition: DeploymentTransition = {
      from: deployment.status as DeploymentState,
      to: newState,
      action: `transition_${deployment.status}_to_${newState}`,
      timestamp: new Date(),
      metadata,
    };

    deployment.status = newState;

    // Store transition history
    if (!deployment.transitions) {
      deployment.transitions = [];
    }
    deployment.transitions.push(transition);

    if (
      newState === 'successful' ||
      newState === 'failed' ||
      newState === 'rolled-back'
    ) {
      deployment.completedAt = new Date();
    }

    const updatedDeployment = await this.deploymentsRepository.save(deployment);

    this.logger.log(
      `Deployment ${deploymentId} transitioned: ${transition.from} -> ${transition.to}`,
      { transition, deployment: updatedDeployment },
    );

    return updatedDeployment;
  }

  canTransition(from: DeploymentState, to: DeploymentState): boolean {
    return this.validTransitions[from]?.includes(to) ?? false;
  }

  async startDeployment(deploymentId: string): Promise<Deployment> {
    const deployment = await this.deploymentsRepository.findOne({
      where: { id: deploymentId },
      relations: ['resource'],
    });

    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    // Capture snapshot of current resource state before deployment
    const currentResourceState = await this.captureResourceSnapshot(
      deployment.resourceId,
    );

    // Store the previous configuration for rollback
    await this.deploymentsRepository.update(deploymentId, {
      previousConfig: currentResourceState,
    });

    // Transition to in-progress
    await this.transition(deploymentId, 'in-progress', {
      action: 'start_deployment',
      resourceId: deployment.resourceId,
      snapshotCaptured: true,
    });

    try {
      // Execute the deployment via cloud provider
      const deploymentRequest: DeploymentRequest = {
        resourceId: deployment.resourceId,
        action: deployment.action,
        config: {
          version: deployment.version,
          name: deployment.name,
          ...currentResourceState, // Include current state for context
        },
      };

      // Get the cloud provider from the resource service
      // For now, we'll assume it's available via the service
      const result = await this.executeDeployment(deploymentRequest);

      if (result.success) {
        // Store the new configuration for future rollbacks
        await this.deploymentsRepository.update(deploymentId, {
          rollbackConfig: deploymentRequest.config,
        });

        return await this.transition(deploymentId, 'successful', {
          result,
          action: 'deployment_completed',
        });
      } else {
        return await this.transition(deploymentId, 'failed', {
          result,
          action: 'deployment_failed',
          error: result.message,
        });
      }
    } catch (error) {
      this.logger.error(`Deployment ${deploymentId} failed`, error);
      return await this.transition(deploymentId, 'failed', {
        error: error.message,
        action: 'deployment_error',
      });
    }
  }

  private async executeDeployment(request: DeploymentRequest) {
    // This would normally use the cloud provider
    // For now, simulate the deployment
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 second deployment

    return {
      success: Math.random() > 0.2, // 80% success rate
      resourceId: request.resourceId,
      status: 'successful' as const,
      message: `Mock deployment ${request.action} completed`,
      metadata: {
        deploymentId: `dep_${Date.now()}`,
        action: request.action,
        config: request.config,
      },
    };
  }

  async retryDeployment(deploymentId: string): Promise<Deployment> {
    const deployment = await this.deploymentsRepository.findOne({
      where: { id: deploymentId },
    });

    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (deployment.status !== 'failed') {
      throw new Error(
        `Can only retry failed deployments. Current status: ${deployment.status}`,
      );
    }

    // Reset timestamps and transition back to pending
    deployment.completedAt = undefined;
    deployment.startedAt = new Date();
    await this.deploymentsRepository.save(deployment);

    return await this.transition(deploymentId, 'pending', {
      action: 'retry_deployment',
      previousStatus: 'failed',
    });
  }

  private async captureResourceSnapshot(
    resourceId: string,
  ): Promise<Record<string, any>> {
    try {
      // Get current resource status and metrics
      const status =
        await this.cloudResourcesService.getResourceStatus(resourceId);
      const metrics =
        await this.cloudResourcesService.getResourceMetrics(resourceId);

      // Get resource details from database
      const resource = await this.cloudResourcesService.getOne(resourceId);

      return {
        status,
        metrics,
        config: {
          type: resource?.type,
          cpu: resource?.cpu,
          ram: resource?.ram,
          storage: resource?.storage,
          region: resource?.region,
          ip: resource?.ip,
        },
        capturedAt: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.warn(
        `Failed to capture snapshot for resource ${resourceId}`,
        error,
      );
      return {
        status: 'unknown',
        metrics: {},
        config: {},
        capturedAt: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  async rollbackDeployment(deploymentId: string): Promise<Deployment> {
    const deployment = await this.deploymentsRepository.findOne({
      where: { id: deploymentId },
      relations: ['resource'],
    });

    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (deployment.status !== 'successful') {
      throw new Error(
        `Can only rollback successful deployments. Current status: ${deployment.status}`,
      );
    }

    if (!deployment.previousConfig) {
      throw new Error(
        `No rollback snapshot available for deployment ${deploymentId}`,
      );
    }

    await this.transition(deploymentId, 'rolling-back', {
      action: 'start_rollback',
      snapshot: deployment.previousConfig,
    });

    try {
      // Execute actual rollback using the captured snapshot
      const rollbackResult = await this.executeRollback(deployment);

      if (rollbackResult.success) {
        return await this.transition(deploymentId, 'rolled-back', {
          action: 'rollback_completed',
          rollbackResult,
        });
      } else {
        // If rollback fails, mark deployment as failed but keep the rollback attempt
        await this.transition(deploymentId, 'failed', {
          action: 'rollback_failed',
          error: rollbackResult.message,
          partialRollback: true,
        });
        throw new Error(`Rollback failed: ${rollbackResult.message}`);
      }
    } catch (error) {
      await this.transition(deploymentId, 'failed', {
        action: 'rollback_error',
        error: error.message,
      });
      throw error;
    }
  }

  private async executeRollback(
    deployment: Deployment,
  ): Promise<{ success: boolean; message?: string; metadata?: any }> {
    try {
      const { previousConfig, resourceId, action } = deployment;

      // Determine the reverse action based on the original deployment action
      const reverseAction = this.getReverseAction(action);

      // Execute the rollback via cloud provider
      const rollbackRequest: DeploymentRequest = {
        resourceId,
        action: reverseAction,
        config: {
          ...(previousConfig?.config || {}),
          rollback: true,
          originalAction: action,
          snapshotTimestamp: previousConfig?.capturedAt,
        },
      };

      const result = await this.executeDeployment(rollbackRequest);

      if (result.success) {
        // Update the resource in database to reflect rolled back state
        await this.updateResourceAfterRollback(resourceId, previousConfig);

        return {
          success: true,
          message: 'Rollback completed successfully',
          metadata: {
            reverseAction,
            restoredConfig: previousConfig?.config,
          },
        };
      } else {
        return {
          success: false,
          message: result.message || 'Rollback execution failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Rollback execution error: ${error.message}`,
      };
    }
  }

  private getReverseAction(
    originalAction: string,
  ): DeploymentRequest['action'] {
    switch (originalAction) {
      case 'scale-up':
        return 'scale-down';
      case 'scale-down':
        return 'scale-up';
      case 'update':
        return 'update'; // Update to previous version
      case 'restart':
        return 'restart'; // Restart to ensure stability
      default:
        return 'update';
    }
  }

  private async updateResourceAfterRollback(
    resourceId: string,
    previousConfig: any,
  ): Promise<void> {
    try {
      // Update the resource record to reflect the rolled back configuration
      const updateData: any = {};

      if (previousConfig.config) {
        if (previousConfig.config.cpu !== undefined)
          updateData.cpu = previousConfig.config.cpu;
        if (previousConfig.config.ram !== undefined)
          updateData.ram = previousConfig.config.ram;
        if (previousConfig.config.storage !== undefined)
          updateData.storage = previousConfig.config.storage;
        if (previousConfig.config.ip !== undefined)
          updateData.ip = previousConfig.config.ip;
      }

      if (Object.keys(updateData).length > 0) {
        await this.cloudResourcesService.update(resourceId, updateData);
      }
    } catch (error) {
      this.logger.warn(
        `Failed to update resource ${resourceId} after rollback`,
        error,
      );
      // Don't throw - rollback was successful even if DB update failed
    }
  }

  getAvailableTransitions(state: DeploymentState): DeploymentState[] {
    return this.validTransitions[state] || [];
  }
}
