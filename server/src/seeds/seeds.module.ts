import { Logger, Module } from '@nestjs/common';
import { SeedsProvider } from './seeds.provider';
import { SeedsService } from './seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { ProductsService } from '../products/products.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
import { Category } from '../entities/categories.entity';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Product, Category]),
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
  ],
  providers: [
    SeedsProvider,
    SeedsService,
    Logger,
    ProductsService,
    CategoriesService,
  ],
})
export class SeedsModule {}
