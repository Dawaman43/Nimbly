import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudResource } from './cloud-resource.entity';

@Injectable()
export class CloudResourcesService implements OnModuleInit {
  constructor(
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {}

  async onModuleInit() {
    // Don't seed resources - users should create their own
    // New users will start with empty resources
    return;
    
    // OLD SEEDING CODE - DISABLED
    /*
    const count = await this.resourceRepository.count();
    if (count === 0) {
      // Seed data
      const userId = '550e8400-e29b-41d4-a716-446655440000'; // Fixed UUID for seed user
      const seeds = [
        {
          name: 'app-core-production',
          type: 'EC2',
          spec: 'vCPU 4 / 8GB',
          region: 'us-east-1',
          status: 'running',
          ip: '10.0.1.24',
          cpu: 45,
          ram: 60,
          storage: 120,
          userId,
        },
        {
          name: 'app-core-staging',
          type: 'EC2',
          spec: 'vCPU 2 / 4GB',
          region: 'us-east-1',
          status: 'stopped',
          ip: '10.0.1.25',
          cpu: 0,
          ram: 0,
          storage: 40,
          userId,
        },
        {
          name: 'primary-db-cluster',
          type: 'RDS',
          spec: 'Postgres 15',
          region: 'us-east-1',
          status: 'running',
          ip: '10.0.2.10',
          cpu: 22,
          ram: 45,
          storage: 500,
          userId,
        },
        {
          name: 'assets-bucket-global',
          type: 'S3',
          spec: 'Standard S3',
          region: 'global',
          status: 'running',
          ip: '-',
          cpu: 0,
          ram: 0,
          storage: 1560,
          userId,
        },
        {
          name: 'redis-cache-worker',
          type: 'EC2',
          spec: 'Redis 7',
          region: 'eu-west-2',
          status: 'running',
          ip: '10.0.3.55',
          cpu: 12,
          ram: 85,
          storage: 20,
          userId,
        },
        {
          name: 'load-balancer-main',
          type: 'EC2',
          spec: 'ALB',
          region: 'us-east-1',
          status: 'running',
          ip: '192.168.1.1',
          cpu: 8,
          ram: 15,
          storage: 0,
          userId,
        },
      ];
      // Type casting to map "EC2" to enum if needed, or we adjust seeds to match Entity Enums exactly using "as any"
      await this.resourceRepository.save(seeds as any[]);
    }
    */
  }

  async create(resource: Partial<CloudResource>): Promise<CloudResource> {
    const newResource = this.resourceRepository.create(resource);
    return this.resourceRepository.save(newResource);
  }

  async getAll(userId: string): Promise<CloudResource[]> {
    return this.resourceRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getOne(id: string): Promise<CloudResource | null> {
    return this.resourceRepository.findOne({ where: { id } });
  }
}
