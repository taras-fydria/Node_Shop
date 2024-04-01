import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto } from './dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategory(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id: categoryId } });
  }

  async create(createDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createDto);
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

  async categoryExist(id: number): Promise<boolean> {
    try {
      const result = await this.categoryRepository.exists({ where: { id } });
      console.log(result);

      if (!result)
        throw new HttpException(
          "category don't exist exist",
          HttpStatus.BAD_REQUEST,
        );

      return result;
    } catch (e) {
      Logger.error(e);
    }
  }

  async getAllCategoriesCount(): Promise<number> {
    try {
      return this.categoryRepository.count();
    } catch (e) {
      Logger.error(e);
    }
  }
}
