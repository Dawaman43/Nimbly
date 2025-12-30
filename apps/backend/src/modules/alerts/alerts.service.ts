import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';

@Injectable()
export class AlertsService implements OnModuleInit {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
  ) {}

  async onModuleInit() {
    const count = await this.alertsRepository.count();
    if (count === 0) {
      const userId = '550e8400-e29b-41d4-a716-446655440000';
      const seeds = [
        {
          type: 'CPU', // mapped enum
          threshold: 90,
          userId,
          resourceId: 'res-1',
          triggeredAt: new Date(),
        },
        {
          type: 'Storage',
          threshold: 85,
          userId,
          resourceId: 'res-4',
          triggeredAt: new Date(Date.now() - 1000 * 60 * 30),
        },
      ];
      await this.alertsRepository.save(seeds as any[]);
    }
  }

  async findAll(): Promise<any[]> {
    const alerts = await this.alertsRepository.find({
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
