import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userToken: string;

  @ApiProperty()
  @Column()
  productId: number;

  @ApiProperty()
  @Column()
  amount: number;
}
