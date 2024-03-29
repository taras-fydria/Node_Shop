import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: false, unique: true })
  @IsString({ message: 'Product Name should be type String' })
  productName: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  @IsString()
  productDescription: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false, default: 1 })
  @IsNumber()
  @Min(1)
  quantityPerUnit: number;

  @ApiProperty()
  @Column({ type: 'int' })
  @IsNumber()
  @Min(0)
  unitsInStock: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  @IsNumber()
  @Min(0)
  @Max(99)
  discount: number;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  @IsNumber()
  createTimeStamp: number;
}
