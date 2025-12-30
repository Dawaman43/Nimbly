export interface SystemMetric {
    timestamp: string;
    cpu: number;
    memory: number;
}

export interface LogEntry {
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    source: string;
}

export interface MonitoringStats {
    metrics: SystemMetric[];
    activeAlerts: number;
    uptime: number; // percentage
}
