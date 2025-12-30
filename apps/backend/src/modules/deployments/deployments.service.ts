import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deployment } from './deployment.entity';

@Injectable()
export class DeploymentsService implements OnModuleInit {
  constructor(
    @InjectRepository(Deployment)
    private deploymentsRepository: Repository<Deployment>,
  ) {}

  async onModuleInit() {
    const count = await this.deploymentsRepository.count();
    if (count === 0) {
      // Seed initial data
      const userId = '550e8400-e29b-41d4-a716-446655440000';
      const seeds = [
        {
          name: 'api-server-v2',
          status: 'in-progress', // mapped to pending/in-progress/successful/failed
          resourceId: 'res-1',
          userId,
          version: 'v2.0.1',
          action: 'update',
          startedAt: new Date(Date.now() - 1000 * 60 * 2),
        },
        {
          name: 'worker-node-04',
          status: 'failed',
          resourceId: 'res-2',
          userId,
          version: 'v1.5.0',
          action: 'scale-up',
          startedAt: new Date(Date.now() - 1000 * 60 * 60),
        },
        {
          name: 'db-replica-01',
          status: 'successful',
          resourceId: 'res-3',
          userId,
          version: 'v15.2',
          action: 'restart',
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
        {
          name: 'frontend-main',
          status: 'successful',
          resourceId: 'res-4',
          userId,
          version: 'v4.2.0',
          action: 'update',
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        },
        {
          name: 'cache-redis-x',
          status: 'successful',
          resourceId: 'res-5',
          userId,
          version: 'v7.0',
          action: 'scale-up',
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      ];

      // Note: we are casting to any because of relation constraints (user/resource) which are loose in this demo
      await this.deploymentsRepository.save(seeds as any[]);
    }
  }

  async findAll(): Promise<Deployment[]> {
    return this.deploymentsRepository.find({
      order: { startedAt: 'DESC' },
    });
  }
}
