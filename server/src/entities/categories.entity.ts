import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductsEntity } from './products.entity';

@Entity()
export class CategoryEntity {
  @ApiProperty({})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text' })
  @IsString()
  categoryName: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}
