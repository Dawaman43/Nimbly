import { Injectable } from '@nestjs/common';
import type { MonitoringStats, SystemMetric } from '@nimbly/shared-types';

@Injectable()
export class MonitoringService {
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

    getLogs() {
        return [
            { id: 'log_1', timestamp: new Date().toISOString(), level: 'error', message: 'Connection timeout', source: 'db-shard-01' },
            { id: 'log_2', timestamp: new Date(Date.now() - 100000).toISOString(), level: 'warn', message: 'High CPU usage', source: 'compute-c4' },
            { id: 'log_3', timestamp: new Date(Date.now() - 200000).toISOString(), level: 'info', message: 'Deployment successful', source: 'deployer' },
        ]
    }
}
