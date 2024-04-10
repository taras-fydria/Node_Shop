import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProductDto, ProductsQueryDto } from './dto';
import { AllProductsResponse } from './interfaces';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  async getAll(query: ProductsQueryDto): Promise<AllProductsResponse> {
    const options: FindManyOptions<ProductsEntity> = {};

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

  async createNew(createDto: CreateProductDto): Promise<ProductsEntity> {
    return await this.productsRepository.save(createDto);
  }

  async getProduct(id: number): Promise<ProductsEntity> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async update(id: number, inputData: CreateProductDto) {
    const result = await this.productsRepository
      .createQueryBuilder('update product')
      .update()
      .set(inputData)
      .where({ id })
      .returning('*')
      .execute();
    return result;
  }

  async delete(productId: number): Promise<DeleteResult> {
    return await this.productsRepository.delete(productId);
  }

  async getAllProductsCount(): Promise<number> {
    return await this.productsRepository.count({});
  }

  async existProduct(productId: number): Promise<boolean> {
    return await this.productsRepository.exists({ where: { id: productId } });
  }
}
