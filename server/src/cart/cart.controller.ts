import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CartEntity } from '../entities/cart.entity';
import { CartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiCreatedResponse({ type: CartEntity, isArray: true })
  async getAll(): Promise<CartEntity[]> {
    try {
      return await this.cartService.getAll();
    } catch (e) {}
  }

  @Post()
  async createNew(@Body() body: CreateCartItemDto) {
    try {
      const result = await this.cartService.createNew(body);
      return result;
    } catch (e) {
      Logger.error(e);
    }
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() body: UpdateCartItemDto,
  ): Promise<UpdateResult | void> {
    return await this.cartService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') itemId: number): Promise<DeleteResult> {
    return this.cartService.deleteOne(itemId);
  }
}
