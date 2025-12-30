import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';

export interface CostEstimate {
  resourceId: string;
  resourceType: string;
  hourlyRate: number;
  monthlyEstimate: number;
  currency: string;
  breakdown: {
    compute: number;
    storage: number;
    network: number;
    other: number;
  };
  confidence: number; // 0-1, how accurate the estimate is
  lastUpdated: Date;
}

export interface CostOptimization {
  resourceId: string;
  recommendations: Array<{
    type:
      | 'scale-down'
      | 'reserved-instance'
      | 'storage-optimization'
      | 'network-optimization';
    description: string;
    potentialSavings: number;
    confidence: number;
  }>;
  totalPotentialSavings: number;
}

export interface CostAnalysis {
  totalMonthlyCost: number;
  totalHourlyCost: number;
  costByService: Record<string, number>;
  costTrend: Array<{
    date: string;
    cost: number;
  }>;
  optimizations: CostOptimization[];
  currency: string;
}

@Injectable()
export class CostEstimationService {
  constructor(
    @InjectRepository(CloudResource)
    private resourceRepository: Repository<CloudResource>,
  ) {}

  /**
   * Estimate cost for a specific resource configuration
   */
  async estimateResourceCost(
    resourceType: string,
    config: Record<string, any>,
    region: string = 'us-east-1',
  ): Promise<CostEstimate> {
    const baseRates = this.getBaseRates(resourceType, region);
    const hourlyRate = this.calculateHourlyRate(
      resourceType,
      config,
      baseRates,
    );
    const monthlyEstimate = hourlyRate * 24 * 30; // Rough monthly estimate

    const breakdown = this.calculateCostBreakdown(
      resourceType,
      config,
      baseRates,
    );

    return {
      resourceId: config.resourceId || 'estimated',
      resourceType,
      hourlyRate,
      monthlyEstimate,
      currency: 'USD',
      breakdown,
      confidence: 0.85, // Mock confidence level
      lastUpdated: new Date(),
    };
  }

  /**
   * Analyze costs for all user resources
   */
  async analyzeUserCosts(userId: string): Promise<CostAnalysis> {
    const resources = await this.resourceRepository.find({
      where: { userId },
    });

    let totalMonthlyCost = 0;
    let totalHourlyCost = 0;
    const costByService: Record<string, number> = {};
    const optimizations: CostOptimization[] = [];

    for (const resource of resources) {
      const estimate = await this.estimateResourceCost(
        resource.type,
        {
          resourceId: resource.id,
          cpu: resource.cpu,
          ram: resource.ram,
          storage: resource.storage,
        },
        'us-east-1', // Default region
      );

      totalMonthlyCost += estimate.monthlyEstimate;
      totalHourlyCost += estimate.hourlyRate;
      costByService[resource.type] =
        (costByService[resource.type] || 0) + estimate.monthlyEstimate;

      // Generate optimization recommendations
      const optimization = await this.generateOptimization(resource);
      if (optimization.recommendations.length > 0) {
        optimizations.push(optimization);
      }
    }

    // Mock cost trend data (last 30 days)
    const costTrend = this.generateCostTrend(totalMonthlyCost / 30);

    return {
      totalMonthlyCost,
      totalHourlyCost,
      costByService,
      costTrend,
      optimizations,
      currency: 'USD',
    };
  }

  /**
   * Get cost forecast for next month
   */
  async getCostForecast(
    userId: string,
    months: number = 1,
  ): Promise<{
    currentMonth: number;
    forecast: number;
    confidence: number;
    breakdown: Record<string, number>;
  }> {
    const analysis = await this.analyzeUserCosts(userId);

    // Simple forecasting based on current usage
    // In a real implementation, this would use time series analysis
    const growthRate = 0.05; // 5% monthly growth assumption
    const forecast =
      analysis.totalMonthlyCost * Math.pow(1 + growthRate, months);

    return {
      currentMonth: analysis.totalMonthlyCost,
      forecast,
      confidence: 0.75,
      breakdown: analysis.costByService,
    };
  }

  /**
   * Generate cost optimization recommendations for a resource
   */
  private async generateOptimization(
    resource: CloudResource,
  ): Promise<CostOptimization> {
    const recommendations: CostOptimization['recommendations'] = [];

    // CPU optimization
    if (resource.cpu > 2 && resource.cpu < 8) {
      const potentialSavings = this.calculatePotentialSavings(resource, 'cpu');
      if (potentialSavings > 10) {
        recommendations.push({
          type: 'scale-down' as const,
          description: `Consider reducing CPU from ${resource.cpu} to ${Math.max(1, resource.cpu - 1)} cores`,
          potentialSavings,
          confidence: 0.7,
        });
      }
    }

    // Storage optimization
    if (resource.storage > 100) {
      const potentialSavings = this.calculatePotentialSavings(
        resource,
        'storage',
      );
      if (potentialSavings > 5) {
        recommendations.push({
          type: 'storage-optimization' as const,
          description:
            'Consider using cheaper storage tiers for infrequently accessed data',
          potentialSavings,
          confidence: 0.6,
        });
      }
    }

    // Reserved instance recommendation (mock)
    if (Math.random() > 0.7) {
      // 30% chance for demo
      recommendations.push({
        type: 'reserved-instance' as const,
        description:
          'Consider purchasing a reserved instance for 20% cost savings',
        potentialSavings:
          this.getBaseRates(resource.type, 'us-east-1').hourly * 24 * 30 * 0.2,
        confidence: 0.8,
      });
    }

    return {
      resourceId: resource.id,
      recommendations,
      totalPotentialSavings: recommendations.reduce(
        (sum, rec) => sum + rec.potentialSavings,
        0,
      ),
    };
  }

  /**
   * Calculate potential savings from optimization
   */
  private calculatePotentialSavings(
    resource: CloudResource,
    optimizationType: string,
  ): number {
    const baseRates = this.getBaseRates(resource.type, 'us-east-1');

    switch (optimizationType) {
      case 'cpu':
        return baseRates.hourly * 24 * 30 * 0.15; // 15% savings
      case 'storage':
        return baseRates.storage * resource.storage * 0.1; // 10% savings
      default:
        return 0;
    }
  }

  /**
   * Calculate hourly rate based on resource configuration
   */
  private calculateHourlyRate(
    resourceType: string,
    config: Record<string, any>,
    baseRates: any,
  ): number {
    let rate = baseRates.hourly;

    // CPU scaling
    if (config.cpu) {
      rate *= Math.max(1, config.cpu / 2); // Base is 2 CPUs
    }

    // RAM scaling
    if (config.ram) {
      rate *= Math.max(1, config.ram / 4); // Base is 4GB RAM
    }

    return rate;
  }

  /**
   * Calculate detailed cost breakdown
   */
  private calculateCostBreakdown(
    resourceType: string,
    config: Record<string, any>,
    baseRates: any,
  ): { compute: number; storage: number; network: number; other: number } {
    const hourlyRate = this.calculateHourlyRate(
      resourceType,
      config,
      baseRates,
    );
    const monthlyRate = hourlyRate * 24 * 30;

    // Rough breakdown (in a real system, this would be more sophisticated)
    return {
      compute: monthlyRate * 0.6,
      storage: (config.storage || 0) * (baseRates.storage || 0.1),
      network: monthlyRate * 0.1,
      other: monthlyRate * 0.2,
    };
  }

  /**
   * Get base rates for different resource types and regions
   */
  private getBaseRates(resourceType: string, region: string): any {
    // Mock pricing data (in reality, this would come from a pricing API)
    const basePricing = {
      EC2: {
        hourly: 0.096, // t3.medium equivalent
        storage: 0.08, // per GB/month
        network: 0.01, // per GB
      },
      RDS: {
        hourly: 0.25, // db.t3.medium
        storage: 0.115, // per GB/month
        network: 0.01,
      },
      S3: {
        hourly: 0, // Storage-only service
        storage: 0.023, // Standard storage
        network: 0.09, // Data transfer out
      },
      Lambda: {
        hourly: 0, // Pay per request
        storage: 0,
        network: 0,
        perRequest: 0.0000002,
        perGbSecond: 0.0000166667,
      },
    };

    // Regional adjustments (simplified)
    const regionalMultiplier = {
      'us-east-1': 1.0,
      'us-west-2': 1.05,
      'eu-west-1': 1.1,
      'ap-southeast-1': 1.15,
    };

    const base = basePricing[resourceType as keyof typeof basePricing] || {
      hourly: 0.1,
      storage: 0.1,
      network: 0.01,
    };

    const multiplier =
      regionalMultiplier[region as keyof typeof regionalMultiplier] || 1.0;

    return {
      hourly: base.hourly * multiplier,
      storage: base.storage * multiplier,
      network: base.network * multiplier,
    };
  }

  /**
   * Generate mock cost trend data
   */
  private generateCostTrend(
    dailyAverage: number,
  ): Array<{ date: string; cost: number }> {
    const trend: Array<{ date: string; cost: number }> = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Add some random variation (±10%)
      const variation = (Math.random() - 0.5) * 0.2;
      const cost = dailyAverage * (1 + variation);

      trend.push({
        date: date.toISOString().split('T')[0],
        cost: Math.max(0, cost),
      });
    }

    return trend;
  }
}
