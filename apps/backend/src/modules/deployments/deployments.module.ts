import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeploymentsController } from './deployments.controller';
import { DeploymentsService } from './deployments.service';
import { Deployment } from './deployment.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deployment, CloudResource])],
  controllers: [DeploymentsController],
  providers: [DeploymentsService],
})
export class DeploymentsModule { }
