import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostEstimationController } from './cost-estimation.controller';
import { CostEstimationService } from './cost-estimation.service';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CloudResource])],
  controllers: [CostEstimationController],
  providers: [CostEstimationService],
  exports: [CostEstimationService],
})
export class CostEstimationModule {}
