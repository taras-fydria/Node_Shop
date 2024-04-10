import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/categories.entity';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
