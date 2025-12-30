import { Controller, Get, UseGuards } from '@nestjs/common';
import { AlertsService, Alert } from './alerts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('alerts')
export class AlertsController {
    constructor(private readonly alertsService: AlertsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Alert[] {
        return this.alertsService.findAll();
    }
}
