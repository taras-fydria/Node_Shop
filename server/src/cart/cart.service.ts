import { Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async itemExist(itemId: number): Promise<boolean> {
    return await this.cartRepository.exists({ where: { id: itemId } });
  }

  async getAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }

  async getOne(id: number): Promise<CartEntity> {
    return this.cartRepository.findOne({ where: { id } });
  }

  async createNew(newItem: CreateCartItemDto): Promise<InsertResult> {
    return await this.cartRepository.insert(newItem);
  }

  async updateOne(cartItemId: number, existingItem: UpdateCartItemDto) {
    return await this.cartRepository.update(cartItemId, existingItem);
  }
  async deleteOne(itemId: number): Promise<DeleteResult> {
    return await this.cartRepository.delete({ id: itemId });
  }
}
