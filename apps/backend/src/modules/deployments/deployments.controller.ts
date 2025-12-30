import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeploymentsService, Deployment } from './deployments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deployments')
export class DeploymentsController {
    constructor(private readonly deploymentsService: DeploymentsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Deployment[] {
        return this.deploymentsService.findAll();
    }
}
