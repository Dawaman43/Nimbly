import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CloudResourcesService } from './cloud-resources.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudResource } from './cloud-resource.entity';

@ApiTags('Resources')
@ApiBearerAuth('JWT-auth')
@Controller('cloud-resources')
export class CloudResourcesController {
  constructor(private readonly cloudService: CloudResourcesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req): Promise<CloudResource[]> {
    const userId = req.user.userId;
    return await this.cloudService.getAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<CloudResource> {
    const resource = await this.cloudService.getOne(id);
    if (!resource) {
      throw new NotFoundException(`CloudResource with id ${id} not found`);
    }
    return resource;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/metrics')
  async getMetrics(@Param('id') id: string) {
    return await this.cloudService.getResourceMetrics(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    return { status: await this.cloudService.getResourceStatus(id) };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() resource: Partial<CloudResource>,
  ): Promise<CloudResource> {
    const userId = req.user.userId;
    return await this.cloudService.create({ ...resource, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/scale')
  async scale(@Param('id') id: string, @Body() newConfig: Record<string, any>) {
    return await this.cloudService.scaleResource(id, newConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/start')
  async start(@Param('id') id: string) {
    return await this.cloudService.startResource(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/stop')
  async stop(@Param('id') id: string) {
    return await this.cloudService.stopResource(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/restart')
  async restart(@Param('id') id: string) {
    return await this.cloudService.restartResource(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/terminate')
  async terminate(@Param('id') id: string) {
    return await this.cloudService.terminateResource(id);
  }
}
