import { Controller, Get, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './alert.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any[]> {
    return await this.alertsService.findAll();
  }
}
