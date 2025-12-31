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
  confidence: number;
  lastUpdated: string;
}

export interface CostOptimization {
  resourceId: string;
  recommendations: Array<{
    type:
      | "scale-down"
      | "reserved-instance"
      | "storage-optimization"
      | "network-optimization"
      | "auto-shutdown"
      | "rightsizing";
    description: string;
    potentialSavings: number;
    confidence: number;
    implementationEffort?: "low" | "medium" | "high";
    riskLevel?: "low" | "medium" | "high";
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
  aiInsights?: string[];
  costEfficiency?: number;
  recommendations?: string[];
}
