import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deployment } from './deployment.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

@Injectable()
export class DeploymentsService implements OnModuleInit {
  constructor(
    @InjectRepository(Deployment)
    private deploymentsRepository: Repository<Deployment>,
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {}

  async onModuleInit() {
    // Don't seed deployments - users should create their own
    // New users will start with empty deployments
    return;
    
    // OLD SEEDING CODE - DISABLED
    /*
    const count = await this.deploymentsRepository.count();
    if (count === 0) {
      // Wait for resources to be seeded first (they seed in parallel)
      // Retry up to 5 times with 500ms delay
      let resources = await this.resourceRepository.find();
      let retries = 0;
      while (resources.length === 0 && retries < 5) {
        await new Promise(resolve => setTimeout(resolve, 500));
        resources = await this.resourceRepository.find();
        retries++;
      }
      
      if (resources.length === 0) {
        console.log('No resources found after retries, skipping deployment seeding');
        return;
      }

      // Seed initial data using actual resource UUIDs
      const userId = '550e8400-e29b-41d4-a716-446655440000';
      const seeds = [
        {
          name: 'api-server-v2',
          status: 'in-progress' as const,
          resourceId: resources[0]?.id,
          userId,
          version: 'v2.0.1',
          action: 'update' as const,
          startedAt: new Date(Date.now() - 1000 * 60 * 2),
          timestamp: new Date(Date.now() - 1000 * 60 * 2),
        },
        {
          name: 'worker-node-04',
          status: 'failed' as const,
          resourceId: resources[Math.min(1, resources.length - 1)]?.id,
          userId,
          version: 'v1.5.0',
          action: 'scale-up' as const,
          startedAt: new Date(Date.now() - 1000 * 60 * 60),
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
        },
        {
          name: 'db-replica-01',
          status: 'successful' as const,
          resourceId: resources[Math.min(2, resources.length - 1)]?.id,
          userId,
          version: 'v15.2',
          action: 'restart' as const,
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
        {
          name: 'frontend-main',
          status: 'successful' as const,
          resourceId: resources[Math.min(3, resources.length - 1)]?.id,
          userId,
          version: 'v4.2.0',
          action: 'update' as const,
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        },
        {
          name: 'cache-redis-x',
          status: 'successful' as const,
          resourceId: resources[Math.min(4, resources.length - 1)]?.id,
          userId,
          version: 'v7.0',
          action: 'scale-up' as const,
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      ].filter(seed => seed.resourceId); // Only include seeds with valid resource IDs

      if (seeds.length > 0) {
        await this.deploymentsRepository.save(seeds);
        console.log('Seeded deployments');
      }
    }
    */
  }

  async findAll(userId: string): Promise<Deployment[]> {
    return this.deploymentsRepository.find({
      where: { userId },
      order: { startedAt: 'DESC' },
      relations: ['resource'],
    });
  }
}
