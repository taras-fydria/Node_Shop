import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ProductsQueryDto } from './dto';
import { ProductsEntity } from '../entities/products.entity';
import { AllProductsResponse } from './interfaces';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiCreatedResponse({ type: ProductsEntity, isArray: true })
  async getAll(@Query() query: ProductsQueryDto): Promise<AllProductsResponse> {
    const result = await this.productsService.getAll(query);
    return result;
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: ProductsEntity, isArray: false })
  async createNew(
    @Body() createDto: CreateProductDto,
  ): Promise<ProductsEntity | null> {
    try {
      return await this.productsService.createNew(createDto);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return await this.productsService.getProduct(id);
  }

  @Put(':id')
  @ApiBody({ type: CreateProductDto })
  async update(@Param('id') id: number, @Body() updateDto: CreateProductDto) {
    try {
      return await this.productsService.update(id, updateDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const { raw, affected } = await this.productsService.delete(id);
      return { raw, affected };
    } catch (e) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
