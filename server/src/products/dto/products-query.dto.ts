import { Order, ProductGetParams } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ProductsEntity } from '../../entities/products.entity';

export class ProductsQueryDto implements ProductGetParams {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  offset?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  paged?: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: [Order.ASC, Order.DESC],
  })
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @ApiProperty({
    required: false,
    enum: Object.keys(ProductsEntity).filter(
      (key) =>
        typeof ProductsEntity[key as keyof typeof ProductsEntity] !==
        'function',
    ),
  })
  @IsOptional()
  @IsEnum(ProductsEntity)
  orderBy?: string;
}
