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

    // Transition to in-progress
    await this.transition(deploymentId, 'in-progress', {
      action: 'start_deployment',
      resourceId: deployment.resourceId,
    });

    try {
      // Execute the deployment via cloud provider
      const deploymentRequest: DeploymentRequest = {
        resourceId: deployment.resourceId,
        action: deployment.action,
        config: {
          version: deployment.version,
          name: deployment.name,
        },
      };

      // Get the cloud provider from the resource service
      // For now, we'll assume it's available via the service
      const result = await this.executeDeployment(deploymentRequest);

      if (result.success) {
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

  async rollbackDeployment(deploymentId: string): Promise<Deployment> {
    const deployment = await this.deploymentsRepository.findOne({
      where: { id: deploymentId },
    });

    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (deployment.status !== 'successful') {
      throw new Error(
        `Can only rollback successful deployments. Current status: ${deployment.status}`,
      );
    }

    await this.transition(deploymentId, 'rolling-back', {
      action: 'start_rollback',
    });

    try {
      // Simulate rollback
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return await this.transition(deploymentId, 'rolled-back', {
        action: 'rollback_completed',
      });
    } catch (error) {
      return await this.transition(deploymentId, 'failed', {
        action: 'rollback_failed',
        error: error.message,
      });
    }
  }

  getAvailableTransitions(state: DeploymentState): DeploymentState[] {
    return this.validTransitions[state] || [];
  }
}
