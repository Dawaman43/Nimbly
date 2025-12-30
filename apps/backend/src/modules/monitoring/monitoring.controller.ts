import { Controller, Get, UseGuards } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { MonitoringStats, LogEntry } from '@nimbly/shared-types';

@Controller('monitoring')
export class MonitoringController {
    constructor(private readonly monitoringService: MonitoringService) { }

    @UseGuards(JwtAuthGuard)
    @Get('stats')
    getStats(): MonitoringStats {
        return this.monitoringService.getStats();
    }

    @UseGuards(JwtAuthGuard)
    @Get('logs')
    async getLogs(): Promise<LogEntry[]> {
        return (await this.monitoringService.getLogs()) as unknown as LogEntry[];
    }
}
