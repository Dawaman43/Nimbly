import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CloudResourcesService } from './cloud-resources.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { CloudResource } from '@nimbly/shared-types';

@Controller('cloud-resources')
export class CloudResourcesController {
  constructor(private readonly cloudService: CloudResourcesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): CloudResource[] {
    return this.cloudService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string): CloudResource {
    const resource = this.cloudService.getOne(id);
    if (!resource) {
      throw new NotFoundException(`CloudResource with id ${id} not found`);
    }
    return resource;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() resource: CloudResource): CloudResource {
    return this.cloudService.create(resource);
  }
}
