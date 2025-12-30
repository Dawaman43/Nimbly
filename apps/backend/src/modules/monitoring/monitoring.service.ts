import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { MonitoringStats, SystemMetric } from '@nimbly/shared-types';
import { MonitoringLog } from './monitoring-log.entity';

@Injectable()
export class MonitoringService implements OnModuleInit {
    constructor(
        @InjectRepository(MonitoringLog)
        private logRepo: Repository<MonitoringLog>,
    ) { }

    async onModuleInit() {
        // Don't seed monitoring logs - they should be user-specific
        // Users will see empty logs until they have actual monitoring data
    }

    getStats(): MonitoringStats {
        const metrics: SystemMetric[] = [];
        const now = new Date();
        // Generate 24 hours of data
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000); // Hourly
            metrics.push({
                timestamp: time.toISOString(),
                cpu: 20 + Math.random() * 30, // 20-50%
                memory: 40 + Math.random() * 40, // 40-80%
            });
        }

        return {
            metrics: metrics,
            activeAlerts: 3,
            uptime: 99.98,
        };
    }

    async getLogs(userId: string) {
        return this.logRepo.find({ 
            where: { userId },
            order: { timestamp: 'DESC' }, 
            take: 20 
        });
    }
}
