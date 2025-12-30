import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeploymentsService } from './deployments.service';
import { Deployment } from './deployment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Deployment[]> {
    return await this.deploymentsService.findAll();
  }
}
