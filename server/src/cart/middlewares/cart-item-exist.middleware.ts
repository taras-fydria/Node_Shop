import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CartService } from '../cart.service';

@Injectable()
export class CartMiddleware implements NestMiddleware {
  constructor(private cartService: CartService) {}
  async use(
    req: FastifyRequest,
    res: FastifyReply['raw'],
    next: (error?: any) => void,
  ): Promise<void> {
    if (!req.params.hasOwnProperty('id')) throw new NotFoundException();

    const { id } = req.params as { id: number };
    const exist = await this.cartService.itemExist(id);
    if (!exist) throw new NotFoundException('cart item was not found');
    next();
  }
}
