import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/categories.entity';
import { CreateCategory } from './interfaces';
import { CreateCategoryDto } from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  // @ApCo
  async getAll(): Promise<Category[]> {
    try {
      return await this.categoriesService.getAll();
    } catch (e) {
      return [];
    }
  }

  @Get()
  async getOne(@Param('id') id: number): Promise<Category> {
    try {
      return await this.categoriesService.getCategory(id);
    } catch (e) {
      return null;
    }
  }

  @Post()
  async create(@Body() body: CreateCategoryDto): Promise {
    try {
      return await this.categoriesService.create(body);
    } catch (e) {
      return null;
    }
  }
}
