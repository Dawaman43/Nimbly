import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CostEstimationService } from './cost-estimation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cost-estimation')
export class CostEstimationController {
  constructor(private readonly costService: CostEstimationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('analysis')
  async getCostAnalysis(@Request() req): Promise<any> {
    const userId = req.user.userId;
    return this.costService.analyzeUserCosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('forecast')
  async getCostForecast(
    @Request() req,
    @Query('months') months: string = '1',
  ): Promise<any> {
    const userId = req.user.userId;
    const monthsNum = parseInt(months, 10) || 1;
    return this.costService.getCostForecast(userId, monthsNum);
  }

  @UseGuards(JwtAuthGuard)
  @Post('recommendations')
  async getDeploymentRecommendations(
    @Request() req,
    @Body()
    body: {
      requirements: string;
      budget?: number;
      region?: string;
      workloadType?: string;
    },
  ): Promise<any> {
    return this.costService.generateDeploymentRecommendations(
      body.requirements,
      body.budget,
      body.region,
      body.workloadType,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('record')
  async recordCostData(
    @Request() req,
    @Body()
    body: {
      resourceId: string;
      hourlyCost: number;
      metrics: {
        cpuUtilization: number;
        memoryUtilization: number;
        storageUtilization: number;
        networkIn: number;
        networkOut: number;
        activeConnections: number;
      };
      metadata?: Record<string, any>;
    },
  ): Promise<void> {
    const userId = req.user.userId;
    return this.costService.recordCostData(
      userId,
      body.resourceId,
      body.hourlyCost,
      body.metrics,
      body.metadata,
    );
  }
}
