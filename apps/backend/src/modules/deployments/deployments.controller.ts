import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
}
