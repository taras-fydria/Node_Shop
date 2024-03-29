import { Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategory(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id: categoryId } });
  }

  async create(createDto: CreateCategoryDto): Promise<InsertResult> {
    return await this.categoryRepository.insert(createDto);
  }

  async update(
    categoryID: number,
    updateDto: CreateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(
      {
        id: categoryID,
      },
      updateDto,
    );
  }

  async delete(categoryId: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(categoryId);
  }
}
