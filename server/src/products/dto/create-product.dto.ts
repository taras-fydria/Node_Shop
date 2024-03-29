import { ProductInput } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, Max, Min } from 'class-validator';

export class CreateProductDto implements ProductInput {
  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsString()
  productDescription: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantityPerUnit: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  unitsInStock: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(99)
  discount: number;
}
