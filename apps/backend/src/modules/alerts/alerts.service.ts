import { Injectable } from '@nestjs/common';

export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: Date;
}

@Injectable()
export class AlertsService {
    private alerts: Alert[] = [
        {
            id: 'alert-1',
            type: 'warning',
            title: 'High Latency',
            message: 'Region us-east-1 is experiencing degraded performance.',
            timestamp: new Date(),
        },
        {
            id: 'alert-2',
            type: 'success',
            title: 'Backup Ready',
            message: 'Snapshot sn-492 completed.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
        }
    ];

    findAll(): Alert[] {
        return this.alerts;
    }
}
