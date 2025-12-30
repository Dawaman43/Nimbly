import { Injectable } from '@nestjs/common';

export interface Deployment {
    id: string;
    name: string;
    status: 'running' | 'failed' | 'stopped';
    region: string;
    cpu: string;
    updatedAt: Date;
}

@Injectable()
export class DeploymentsService {
    private deployments: Deployment[] = [
        {
            id: "dep-1",
            name: "api-server-v2",
            status: "running",
            region: "us-east-1",
            cpu: "45%",
            updatedAt: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
        },
        {
            id: "dep-2",
            name: "worker-node-04",
            status: "failed",
            region: "eu-west-1",
            cpu: "0%",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        },
        {
            id: "dep-3",
            name: "db-replica-01",
            status: "stopped",
            region: "us-east-1",
            cpu: "0%",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        },
        {
            id: "dep-4",
            name: "frontend-main",
            status: "running",
            region: "us-west-2",
            cpu: "12%",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        },
        {
            id: "dep-5",
            name: "cache-redis-x",
            status: "running",
            region: "us-east-1",
            cpu: "28%",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
    ];

    findAll(): Deployment[] {
        return this.deployments;
    }
}
