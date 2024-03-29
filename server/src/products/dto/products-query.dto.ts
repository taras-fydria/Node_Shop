import { Order, ProductGetParams } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Product } from '../../entities/products.entity';

export class ProductsQueryDto implements ProductGetParams {
  @ApiProperty({ required: false })
  @IsNumber()
  offset?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  paged?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false, enum: [Order.ASC, Order.DESC] })
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @ApiProperty({ required: false, enum: [Product] })
  @IsEnum(Product)
  orderBy: string;
}
