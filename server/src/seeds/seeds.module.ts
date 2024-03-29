import { Logger, Module } from '@nestjs/common';
import { SeedsProvider } from './seeds.provider';
import { SeedsService } from './seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { ProductsService } from '../products/products.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
  ],
  providers: [SeedsProvider, SeedsService, Logger, ProductsService],
})
export class SeedsModule {}
