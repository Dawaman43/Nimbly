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
import { CloudResourcesService } from './cloud-resources.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudResource } from './cloud-resource.entity';

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
  @Post()
  async create(
    @Request() req,
    @Body() resource: Partial<CloudResource>,
  ): Promise<CloudResource> {
    const userId = req.user.userId;
    return await this.cloudService.create({ ...resource, userId });
  }
}
