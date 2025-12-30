export interface CloudProviderConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
}

export interface DeploymentRequest {
  resourceId: string;
  action:
    | "create"
    | "update"
    | "delete"
    | "scale-up"
    | "scale-down"
    | "restart";
  config: Record<string, any>;
}

export interface DeploymentResult {
  success: boolean;
  resourceId: string;
  status: "pending" | "in-progress" | "successful" | "failed";
  message?: string;
  metadata?: Record<string, any>;
}

export interface ResourceMetrics {
  cpu: number;
  ram: number;
  storage: number;
  networkIn: number;
  networkOut: number;
  timestamp: string;
}

export interface CostEstimate {
  resourceId: string;
  hourlyRate: number;
  monthlyEstimate: number;
  currency: string;
}

export abstract class CloudProvider {
  protected config: CloudProviderConfig;

  constructor(config: CloudProviderConfig) {
    this.config = config;
  }

  abstract getName(): string;

  abstract deploy(request: DeploymentRequest): Promise<DeploymentResult>;

  abstract getResourceStatus(
    resourceId: string
  ): Promise<"running" | "stopped" | "terminated" | "error">;

  abstract getMetrics(resourceId: string): Promise<ResourceMetrics>;

  abstract estimateCost(
    resourceType: string,
    config: Record<string, any>
  ): Promise<CostEstimate>;

  abstract listResources(): Promise<
    Array<{
      id: string;
      name: string;
      type: string;
      status: string;
    }>
  >;

  abstract scaleResource(
    resourceId: string,
    newConfig: Record<string, any>
  ): Promise<DeploymentResult>;
}
