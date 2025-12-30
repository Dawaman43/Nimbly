import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudResource } from './cloud-resource.entity';

@Injectable()
export class CloudResourcesService implements OnModuleInit {
  constructor(
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) { }

  async onModuleInit() {
    const count = await this.resourceRepository.count();
    if (count === 0) {
      // Seed data
      const seeds = [
        { name: "app-core-production", type: "EC2", spec: "vCPU 4 / 8GB", region: "us-east-1", status: "running", ip: "10.0.1.24", cpu: 45, ram: 60, storage: 120, userId: "user-1" },
        { name: "app-core-staging", type: "EC2", spec: "vCPU 2 / 4GB", region: "us-east-1", status: "stopped", ip: "10.0.1.25", cpu: 0, ram: 0, storage: 40, userId: "user-1" },
        { name: "primary-db-cluster", type: "RDS", spec: "Postgres 15", region: "us-east-1", status: "running", ip: "10.0.2.10", cpu: 22, ram: 45, storage: 500, userId: "user-1" },
        { name: "assets-bucket-global", type: "S3", spec: "Standard S3", region: "global", status: "running", ip: "-", cpu: 0, ram: 0, storage: 1560, userId: "user-1" },
        { name: "redis-cache-worker", type: "EC2", spec: "Redis 7", region: "eu-west-2", status: "running", ip: "10.0.3.55", cpu: 12, ram: 85, storage: 20, userId: "user-1" },
        { name: "load-balancer-main", type: "EC2", spec: "ALB", region: "us-east-1", status: "running", ip: "192.168.1.1", cpu: 8, ram: 15, storage: 0, userId: "user-1" },
      ];
      // Type casting to map "EC2" to enum if needed, or we adjust seeds to match Entity Enums exactly using "as any"
      await this.resourceRepository.save(seeds as any[]);
    }
  }

  async create(resource: Partial<CloudResource>): Promise<CloudResource> {
    const newResource = this.resourceRepository.create(resource);
    return this.resourceRepository.save(newResource);
  }

  async getAll(): Promise<CloudResource[]> {
    return this.resourceRepository.find();
  }

  async getOne(id: string): Promise<CloudResource | null> {
    return this.resourceRepository.findOne({ where: { id } });
  }
}
