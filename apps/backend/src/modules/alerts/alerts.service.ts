import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

@Injectable()
export class AlertsService implements OnModuleInit {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {}

  async onModuleInit() {
    // Don't seed alerts - users should create their own
    // New users will start with empty alerts
    return;
    
    // OLD SEEDING CODE - DISABLED
    /*
    const count = await this.alertsRepository.count();
    if (count === 0) {
      // Wait a bit for resources to be seeded first (they seed in parallel)
      // Retry up to 5 times with 500ms delay
      let resources = await this.resourceRepository.find();
      let retries = 0;
      while (resources.length === 0 && retries < 5) {
        await new Promise(resolve => setTimeout(resolve, 500));
        resources = await this.resourceRepository.find();
        retries++;
      }
      
      if (resources.length === 0) {
        console.log('No resources found after retries, skipping alert seeding');
        return;
      }

      const userId = '550e8400-e29b-41d4-a716-446655440000';
      const seeds = [
        {
          type: 'CPU' as const,
          threshold: 90,
          userId,
          resourceId: resources[0]?.id,
          triggeredAt: new Date(),
        },
        {
          type: 'Storage' as const,
          threshold: 85,
          userId,
          resourceId: resources[Math.min(1, resources.length - 1)]?.id,
          triggeredAt: new Date(Date.now() - 1000 * 60 * 30),
        },
      ].filter(seed => seed.resourceId); // Only include seeds with valid resource IDs
      
      if (seeds.length > 0) {
        await this.alertsRepository.save(seeds);
        console.log('Seeded alerts');
      }
    }
    */
  }

  async findAll(userId: string): Promise<any[]> {
    const alerts = await this.alertsRepository.find({
      where: { userId },
      order: { triggeredAt: 'DESC' },
    });

    // Transform to what frontend expects
    return alerts.map((a) => ({
      id: a.id,
      type: a.type === 'CPU' || a.type === 'RAM' ? 'warning' : 'info', // Simple mapping
      title: `${a.type} Alert`,
      message: `${a.type} usage exceeded threshold of ${a.threshold}%`,
      timestamp: a.triggeredAt,
    }));
  }
}
