import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductDto, ProductsQueryDto } from './dto';
import { AllProductsResponse } from './interfaces';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getAll(query: ProductsQueryDto): Promise<AllProductsResponse> {
    const options: FindManyOptions<Product> = {};

    options.take = 'limit' in query ? query.limit : 100;

    if ('offset' in query) options.skip = query.offset;

    try {
      const products = await this.productsRepository.find(options);
      const totalFound = await this.productsRepository.count();
      return { products, totalFound };
    } catch (e) {
      return null;
    }
  }

  async createNew(createDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createDto);
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      return await this.productsRepository.findOne({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async update(id: number, createProductDto: CreateProductDto) {
    const result = await this.productsRepository.update(id, createProductDto);
    return result;
  }

  async delete(productId: number): Promise<DeleteResult> {
    try {
      return await this.productsRepository.delete(productId);
    } catch (e) {
      return e;
    }
  }

  async getAllProductsCount() {
    try {
      return await this.productsRepository.count({});
    } catch (e) {
      return null;
    }
  }
}
