import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { CartMiddleware } from './middlewares/';

@Module({
  controllers: [CartController],
  providers: [CartService, CartMiddleware],
  exports: [CartService],
  imports: [TypeOrmModule.forFeature([CartEntity])],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CartMiddleware).forRoutes(
      {
        path: 'cart/:id',
        method: RequestMethod.PUT,
      },
      { path: 'cart/:id', method: RequestMethod.DELETE },
    );
  }
}
