export interface Alert{
    id: string;
    userId: string;
    resourceId: string;
    type: 'CPU' | 'RAM' | 'Storage' | 'Network';
    threshold: number;
    triggeredAt?: string;
}