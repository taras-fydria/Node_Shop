import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { ProductExist } from './middlewares';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(ProductExist)
      .forRoutes(
        { path: 'products/:id', method: RequestMethod.DELETE },
        { path: 'products/:id', method: RequestMethod.PUT },
      );
  }
}
