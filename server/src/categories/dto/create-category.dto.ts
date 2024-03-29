import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCategory } from '../interfaces';

export class CreateCategoryDto implements CreateCategory {
  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsString()
  description: string;
}
