import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeploymentsController } from './deployments.controller';
import { DeploymentsService } from './deployments.service';
import { DeploymentStateMachine } from './deployment-state-machine.service';
import { Deployment } from './deployment.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';
import { CloudResourcesModule } from '../cloud-resources/cloud-resources.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deployment, CloudResource]),
    CloudResourcesModule,
  ],
  controllers: [DeploymentsController],
  providers: [DeploymentsService, DeploymentStateMachine],
  exports: [DeploymentStateMachine],
})
export class DeploymentsModule {}
