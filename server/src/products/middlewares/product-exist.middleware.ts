import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductExist implements NestMiddleware {
  constructor(protected productService: ProductsService) {}
  async use(
    req: FastifyRequest,
    _: FastifyReply,
    next: (error?: any) => void,
  ): Promise<void> {
    if (!req.params.hasOwnProperty('id')) throw new BadRequestException();
    const { id } = req.params as { id: number };
    const exist = this.productService.existProduct(id);
    if (!exist) throw new NotFoundException('Product was not found');
    next();
  }
}
