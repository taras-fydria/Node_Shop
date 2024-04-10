import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from '../entities/categories.entity';
import { CreateCategoryDto } from './dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  // @ApCo
  async getAll(): Promise<CategoryEntity[]> {
    try {
      return await this.categoriesService.getAll();
    } catch (e) {
      return [];
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CategoryEntity> {
    try {
      return await this.categoriesService.getCategory(id);
    } catch (e) {
      return null;
    }
  }

  @Post()
  async create(@Body() body: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = await this.categoriesService.create(body);
      return category;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateCategoryDto,
  ): Promise<UpdateResult> {
    try {
      const exist = this.categoriesService.categoryExist(id);
      const category = await this.categoriesService.update(id, body);
      return category;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    try {
      await this.categoriesService.categoryExist(id);
      return await this.categoriesService.delete(id);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }
}
