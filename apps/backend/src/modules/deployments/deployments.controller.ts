import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { DeploymentsService } from './deployments.service';
import { Deployment } from './deployment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Deployment[]> {
    const userId = req.user.userId;
    return await this.deploymentsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Deployment> {
    const deployment = await this.deploymentsService.getDeployment(id);
    if (!deployment) {
      throw new NotFoundException(`Deployment with id ${id} not found`);
    }
    return deployment;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body()
    body: {
      resourceId: string;
      action: 'restart' | 'scale-up' | 'scale-down' | 'update';
      version: string;
      name?: string;
    },
  ): Promise<Deployment> {
    const userId = req.user.userId;
    return await this.deploymentsService.create(
      userId,
      body.resourceId,
      body.action,
      body.version,
      body.name,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/start')
  async start(@Param('id') id: string): Promise<Deployment> {
    return await this.deploymentsService.startDeployment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/retry')
  async retry(@Param('id') id: string): Promise<Deployment> {
    return await this.deploymentsService.retryDeployment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rollback')
  async rollback(@Param('id') id: string): Promise<Deployment> {
    return await this.deploymentsService.rollbackDeployment(id);
  }
}
