import { Module } from '@nestjs/common';
import { CloudResourcesController } from './cloud-resources.controller';
import { CloudResourcesService } from './cloud-resources.service';

@Module({
  controllers: [CloudResourcesController],
  providers: [CloudResourcesService],
})
export class CloudResourcesModule {}
