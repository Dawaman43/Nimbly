export interface CloudResource {
    id: string;
    userId: string;
    name: string;
    type: 'EC2' | 'S3' | 'RDS' | 'Lambda';
    status: 'running' | 'stopped' | 'terminated' | 'error';
    cpu: number;
    ram: number; 
    storage: number;
    createdAt: string;
}