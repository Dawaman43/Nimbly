import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Between } from 'typeorm';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';
import { CostHistory } from './cost-history.entity';

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
    @InjectRepository(CostHistory)
    private costHistoryRepository: Repository<CostHistory>,
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
   * Get cost forecast for next month using ML-based time series analysis
   */
  async getCostForecast(
    userId: string,
    months: number = 1,
  ): Promise<{
    currentMonth: number;
    forecast: number;
    confidence: number;
    breakdown: Record<string, number>;
    trend: 'increasing' | 'decreasing' | 'stable';
    seasonality: boolean;
    anomalies: Array<{
      date: string;
      actual: number;
      expected: number;
      deviation: number;
    }>;
  }> {
    const analysis = await this.analyzeUserCosts(userId);

    // Get historical cost data for ML analysis
    const historicalData = await this.getHistoricalCostData(userId, 90); // 90 days

    if (historicalData.length < 7) {
      // Fallback to simple forecasting if insufficient data
      const growthRate = 0.05;
      const forecast =
        analysis.totalMonthlyCost * Math.pow(1 + growthRate, months);

      return {
        currentMonth: analysis.totalMonthlyCost,
        forecast,
        confidence: 0.6,
        breakdown: analysis.costByService,
        trend: 'stable',
        seasonality: false,
        anomalies: [],
      };
    }

    // Apply ML-based forecasting
    const forecastResult = this.applyTimeSeriesForecasting(
      historicalData,
      months,
    );
    const anomalies = this.detectAnomalies(historicalData);
    const trend = this.analyzeTrend(historicalData);
    const seasonality = this.detectSeasonality(historicalData);

    return {
      currentMonth: analysis.totalMonthlyCost,
      forecast: forecastResult.value,
      confidence: forecastResult.confidence,
      breakdown: analysis.costByService,
      trend,
      seasonality,
      anomalies,
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

  /**
   * Get historical cost data for ML analysis
   */
  private async getHistoricalCostData(
    userId: string,
    days: number,
  ): Promise<Array<{ date: Date; cost: number; cpu: number; memory: number }>> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const history = await this.costHistoryRepository.find({
      where: {
        userId,
        timestamp: MoreThan(startDate),
      },
      order: { timestamp: 'ASC' },
    });

    // Group by day and aggregate
    const dailyData = new Map<
      string,
      { cost: number; cpu: number; memory: number; count: number }
    >();

    history.forEach((record) => {
      const dateKey = record.timestamp.toISOString().split('T')[0];
      const existing = dailyData.get(dateKey) || {
        cost: 0,
        cpu: 0,
        memory: 0,
        count: 0,
      };

      dailyData.set(dateKey, {
        cost: existing.cost + Number(record.dailyCost),
        cpu: existing.cpu + record.cpuUtilization,
        memory: existing.memory + record.memoryUtilization,
        count: existing.count + 1,
      });
    });

    return Array.from(dailyData.entries()).map(([dateStr, data]) => ({
      date: new Date(dateStr),
      cost: data.cost,
      cpu: data.cpu / data.count,
      memory: data.memory / data.count,
    }));
  }

  /**
   * Apply time series forecasting using exponential smoothing and trend analysis
   */
  private applyTimeSeriesForecasting(
    historicalData: Array<{
      date: Date;
      cost: number;
      cpu: number;
      memory: number;
    }>,
    months: number,
  ): { value: number; confidence: number } {
    if (historicalData.length < 7) {
      return {
        value: historicalData[historicalData.length - 1]?.cost || 0,
        confidence: 0.5,
      };
    }

    const costs = historicalData.map((d) => d.cost);
    const weights = historicalData.map((_, i) =>
      Math.exp(i / historicalData.length),
    ); // Exponential weights

    // Calculate weighted average and trend
    const weightedSum = costs.reduce(
      (sum, cost, i) => sum + cost * weights[i],
      0,
    );
    const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
    const weightedAvg = weightedSum / weightSum;

    // Calculate trend using linear regression on recent data
    const recentData = historicalData.slice(-14); // Last 2 weeks
    const trend = this.calculateTrend(recentData.map((d) => d.cost));

    // Seasonal adjustment (simplified)
    const seasonalityFactor = this.calculateSeasonalityFactor(historicalData);

    // Forecast with confidence interval
    const forecast = weightedAvg * (1 + trend * months) * seasonalityFactor;
    const confidence = Math.max(
      0.6,
      Math.min(0.95, 1 - 1 / Math.sqrt(historicalData.length)),
    );

    return { value: forecast, confidence };
  }

  /**
   * Calculate linear trend from cost data
   */
  private calculateTrend(costs: number[]): number {
    const n = costs.length;
    if (n < 2) return 0;

    const x = Array.from({ length: n }, (_, i) => i);
    const y = costs;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const avgCost = sumY / n;

    return slope / avgCost; // Return as percentage change per period
  }

  /**
   * Calculate seasonality factor (simplified weekly pattern)
   */
  private calculateSeasonalityFactor(
    historicalData: Array<{ date: Date; cost: number }>,
  ): number {
    if (historicalData.length < 14) return 1;

    // Group by day of week
    const weeklyCosts = new Map<number, number[]>();
    historicalData.forEach((data) => {
      const dayOfWeek = data.date.getDay();
      const costs = weeklyCosts.get(dayOfWeek) || [];
      costs.push(data.cost);
      weeklyCosts.set(dayOfWeek, costs);
    });

    // Calculate average for each day
    const dayAverages = Array.from(weeklyCosts.entries()).map(
      ([day, costs]) => ({
        day,
        avg: costs.reduce((a, b) => a + b, 0) / costs.length,
      }),
    );

    const overallAvg =
      historicalData.reduce((sum, d) => sum + d.cost, 0) /
      historicalData.length;
    const today = new Date().getDay();
    const todayAvg =
      dayAverages.find((d) => d.day === today)?.avg || overallAvg;

    return todayAvg / overallAvg;
  }

  /**
   * Detect cost anomalies using statistical methods
   */
  private detectAnomalies(
    historicalData: Array<{ date: Date; cost: number }>,
  ): Array<{
    date: string;
    actual: number;
    expected: number;
    deviation: number;
  }> {
    if (historicalData.length < 14) return [];

    const costs = historicalData.map((d) => d.cost);
    const mean = costs.reduce((a, b) => a + b, 0) / costs.length;
    const variance =
      costs.reduce((sum, cost) => sum + Math.pow(cost - mean, 2), 0) /
      costs.length;
    const stdDev = Math.sqrt(variance);

    const anomalies: Array<{
      date: string;
      actual: number;
      expected: number;
      deviation: number;
    }> = [];

    historicalData.forEach((data, index) => {
      if (index < 7) return; // Skip initial data for stable baseline

      const expected = this.calculateExpectedValue(
        historicalData.slice(0, index),
        data.date,
      );
      const deviation = Math.abs(data.cost - expected) / stdDev;

      if (deviation > 2) {
        // 2 standard deviations
        anomalies.push({
          date: data.date.toISOString().split('T')[0],
          actual: data.cost,
          expected,
          deviation,
        });
      }
    });

    return anomalies.slice(-10); // Return last 10 anomalies
  }

  /**
   * Calculate expected value using moving average and trend
   */
  private calculateExpectedValue(
    historicalData: Array<{ date: Date; cost: number }>,
    targetDate: Date,
  ): number {
    if (historicalData.length < 7) {
      return historicalData[historicalData.length - 1]?.cost || 0;
    }

    // Simple exponential moving average
    const alpha = 0.3;
    let ema = historicalData[0].cost;

    for (let i = 1; i < historicalData.length; i++) {
      ema = alpha * historicalData[i].cost + (1 - alpha) * ema;
    }

    // Add trend adjustment
    const recentTrend = this.calculateTrend(
      historicalData.slice(-7).map((d) => d.cost),
    );
    const daysSinceLast =
      (targetDate.getTime() -
        historicalData[historicalData.length - 1].date.getTime()) /
      (1000 * 60 * 60 * 24);

    return ema * (1 + recentTrend * daysSinceLast);
  }

  /**
   * Analyze overall cost trend
   */
  private analyzeTrend(
    historicalData: Array<{ date: Date; cost: number }>,
  ): 'increasing' | 'decreasing' | 'stable' {
    if (historicalData.length < 7) return 'stable';

    const recent = historicalData.slice(-7);
    const earlier = historicalData.slice(-14, -7);

    if (earlier.length === 0) return 'stable';

    const recentAvg =
      recent.reduce((sum, d) => sum + d.cost, 0) / recent.length;
    const earlierAvg =
      earlier.reduce((sum, d) => sum + d.cost, 0) / earlier.length;

    const change = (recentAvg - earlierAvg) / earlierAvg;

    if (change > 0.05) return 'increasing';
    if (change < -0.05) return 'decreasing';
    return 'stable';
  }

  /**
   * Detect seasonality in cost patterns
   */
  private detectSeasonality(
    historicalData: Array<{ date: Date; cost: number }>,
  ): boolean {
    if (historicalData.length < 28) return false; // Need at least 4 weeks

    // Simple autocorrelation check for weekly patterns
    const costs = historicalData.map((d) => d.cost);
    const correlations: number[] = [];

    for (let lag = 1; lag <= 7; lag++) {
      let sum = 0;
      let count = 0;

      for (let i = lag; i < costs.length; i++) {
        sum += costs[i] - costs[i - lag];
        count++;
      }

      correlations.push(Math.abs(sum / count));
    }

    // If any correlation is significant, consider it seasonal
    return correlations.some((corr) => corr > 5);
  }

  /**
   * Record cost data point for ML training
   */
  async recordCostData(
    userId: string,
    resourceId: string,
    hourlyCost: number,
    metrics: {
      cpuUtilization: number;
      memoryUtilization: number;
      storageUtilization: number;
      networkIn: number;
      networkOut: number;
      activeConnections: number;
    },
    metadata?: Record<string, any>,
  ): Promise<void> {
    const dailyCost = hourlyCost * 24;
    const monthlyCost = dailyCost * 30;

    await this.costHistoryRepository.save({
      userId,
      resourceId,
      hourlyCost,
      dailyCost,
      monthlyCost,
      ...metrics,
      metadata,
      timestamp: new Date(),
    });
  }
}
