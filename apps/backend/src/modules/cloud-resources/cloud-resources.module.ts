import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudResourcesController } from './cloud-resources.controller';
import { CloudResourcesService } from './cloud-resources.service';
import { CloudResource } from './cloud-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CloudResource])],
  controllers: [CloudResourcesController],
  providers: [CloudResourcesService],
})
export class CloudResourcesModule { }
