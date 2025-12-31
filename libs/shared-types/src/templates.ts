export interface ResourceTemplate {
  id: string;
  name: string;
  description: string;
  category: "compute" | "database" | "storage" | "network" | "serverless";
  provider: "aws" | "mock";
  config: {
    type: string;
    cpu?: number;
    ram?: number;
    storage?: number;
    region?: string;
    [key: string]: any;
  };
  tags: string[];
  estimatedCost: {
    hourly: number;
    monthly: number;
    currency: string;
  };
  popularity: number; // 1-5 stars
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: ResourceTemplate[];
}
