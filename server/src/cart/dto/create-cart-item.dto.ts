import { CreateCartItem } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCartItemDto implements CreateCartItem {
  @ApiProperty({ required: true })
  @IsNumber()
  @Min(1)
  amount!: number;

  @ApiProperty({ required: true })
  @IsNumber()
  productId!: number;

  @ApiProperty({ required: true })
  @IsString()
  userToken!: string;
}
