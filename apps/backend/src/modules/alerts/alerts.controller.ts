import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './alert.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<any[]> {
    const userId = req.user.userId;
    return await this.alertsService.findAll(userId);
  }
}
