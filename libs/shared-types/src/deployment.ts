export interface Deployment {
    id: string;
    userId: string;
    resourceId: string;
    version: string;
    action: 'restart' | 'scale-up' | 'scale-down' | 'update';
    status: 'pending' | 'in-progress' | 'successful' | 'failed';
    startedAt: string;
    completedAt?: string;
    timestamp: string;
}