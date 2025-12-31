import { Injectable } from '@nestjs/common';
import { ResourceTemplate, TemplateCategory } from '@nimbly/shared-types';

@Injectable()
export class TemplatesService {
  private templates: ResourceTemplate[] = [
    // Compute Templates
    {
      id: 't1-web-server',
      name: 'Basic Web Server',
      description:
        'A simple web server for hosting static websites or small applications',
      category: 'compute',
      provider: 'aws',
      config: {
        type: 'EC2',
        cpu: 1,
        ram: 2,
        storage: 20,
        region: 'us-east-1',
        instanceType: 't3.micro',
        ami: 'ami-0abcdef1234567890',
      },
      tags: ['web', 'basic', 'static'],
      estimatedCost: {
        hourly: 0.0104,
        monthly: 7.488,
        currency: 'USD',
      },
      popularity: 4,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 't2-app-server',
      name: 'Application Server',
      description: 'A robust server for running web applications and APIs',
      category: 'compute',
      provider: 'aws',
      config: {
        type: 'EC2',
        cpu: 2,
        ram: 4,
        storage: 50,
        region: 'us-east-1',
        instanceType: 't3.small',
      },
      tags: ['application', 'api', 'web'],
      estimatedCost: {
        hourly: 0.0208,
        monthly: 14.976,
        currency: 'USD',
      },
      popularity: 5,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 't3-gpu-workstation',
      name: 'GPU Workstation',
      description:
        'High-performance workstation with GPU for machine learning and graphics',
      category: 'compute',
      provider: 'aws',
      config: {
        type: 'EC2',
        cpu: 8,
        ram: 32,
        storage: 100,
        region: 'us-east-1',
        instanceType: 'g4dn.xlarge',
        gpu: 1,
      },
      tags: ['gpu', 'ml', 'graphics', 'high-performance'],
      estimatedCost: {
        hourly: 0.736,
        monthly: 530.56,
        currency: 'USD',
      },
      popularity: 3,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },

    // Database Templates
    {
      id: 't4-postgres-dev',
      name: 'PostgreSQL Development',
      description:
        'Development PostgreSQL database for testing and development',
      category: 'database',
      provider: 'aws',
      config: {
        type: 'RDS',
        engine: 'postgres',
        version: '15',
        cpu: 2,
        ram: 4,
        storage: 20,
        region: 'us-east-1',
        instanceClass: 'db.t3.micro',
        multiAz: false,
      },
      tags: ['postgres', 'development', 'database'],
      estimatedCost: {
        hourly: 0.018,
        monthly: 12.96,
        currency: 'USD',
      },
      popularity: 4,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 't5-mysql-prod',
      name: 'MySQL Production',
      description: 'Production-ready MySQL database with high availability',
      category: 'database',
      provider: 'aws',
      config: {
        type: 'RDS',
        engine: 'mysql',
        version: '8.0',
        cpu: 4,
        ram: 16,
        storage: 100,
        region: 'us-east-1',
        instanceClass: 'db.t3.medium',
        multiAz: true,
      },
      tags: ['mysql', 'production', 'ha', 'database'],
      estimatedCost: {
        hourly: 0.192,
        monthly: 138.24,
        currency: 'USD',
      },
      popularity: 5,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },

    // Storage Templates
    {
      id: 't6-static-site',
      name: 'Static Website Hosting',
      description:
        'S3 bucket configured for static website hosting with CloudFront CDN',
      category: 'storage',
      provider: 'aws',
      config: {
        type: 'S3',
        region: 'us-east-1',
        storage: 100,
        website: true,
        cloudfront: true,
        versioning: true,
      },
      tags: ['s3', 'static', 'website', 'cdn'],
      estimatedCost: {
        hourly: 0.0008,
        monthly: 0.576,
        currency: 'USD',
      },
      popularity: 5,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 't7-backup-storage',
      name: 'Backup Storage',
      description: 'S3 bucket with lifecycle policies for automated backups',
      category: 'storage',
      provider: 'aws',
      config: {
        type: 'S3',
        region: 'us-east-1',
        storage: 1000,
        versioning: true,
        lifecycle: true,
        encryption: true,
        access: 'private',
      },
      tags: ['s3', 'backup', 'lifecycle', 'encrypted'],
      estimatedCost: {
        hourly: 0.008,
        monthly: 5.76,
        currency: 'USD',
      },
      popularity: 4,
      author: 'Nimbly Team',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  getAllTemplates(): ResourceTemplate[] {
    return this.templates;
  }

  getTemplatesByCategory(category: string): ResourceTemplate[] {
    return this.templates.filter((template) => template.category === category);
  }

  getTemplateById(id: string): ResourceTemplate | undefined {
    return this.templates.find((template) => template.id === id);
  }

  getCategories(): TemplateCategory[] {
    const categories = [
      {
        id: 'compute',
        name: 'Compute',
        description: 'Virtual machines and computing resources',
        icon: 'Server',
        templates: [],
      },
      {
        id: 'database',
        name: 'Database',
        description: 'Managed database services',
        icon: 'Database',
        templates: [],
      },
      {
        id: 'storage',
        name: 'Storage',
        description: 'Object storage and file systems',
        icon: 'HardDrive',
        templates: [],
      },
      {
        id: 'network',
        name: 'Network',
        description: 'Networking and load balancing',
        icon: 'Globe',
        templates: [],
      },
      {
        id: 'serverless',
        name: 'Serverless',
        description: 'Functions and event-driven computing',
        icon: 'Zap',
        templates: [],
      },
    ];

    // Populate categories with templates
    categories.forEach((category) => {
      category.templates = this.templates.filter(
        (template) => template.category === category.id,
      );
    });

    return categories;
  }

  searchTemplates(query: string): ResourceTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(
      (template) =>
        template.name.toLowerCase().includes(lowercaseQuery) ||
        template.description.toLowerCase().includes(lowercaseQuery) ||
        template.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    );
  }
}
