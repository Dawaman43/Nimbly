import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResourceTemplate, TemplateCategory } from '@nimbly/shared-types';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTemplates(): ResourceTemplate[] {
    return this.templatesService.getAllTemplates();
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  getCategories(): TemplateCategory[] {
    return this.templatesService.getCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('category/:category')
  getTemplatesByCategory(
    @Param('category') category: string,
  ): ResourceTemplate[] {
    return this.templatesService.getTemplatesByCategory(category);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchTemplates(@Query('q') query: string): ResourceTemplate[] {
    return this.templatesService.searchTemplates(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTemplateById(@Param('id') id: string): ResourceTemplate | undefined {
    return this.templatesService.getTemplateById(id);
  }
}
