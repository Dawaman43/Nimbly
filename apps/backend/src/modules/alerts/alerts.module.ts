import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { Alert } from './alert.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, CloudResource])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule { }
