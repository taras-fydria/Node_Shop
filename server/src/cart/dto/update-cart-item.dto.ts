import { CartEntity } from '../../entities/cart.entity';

export class UpdateCartItemDto implements Omit<CartEntity, 'id' | 'userToken'> {
  productId!: number;
  amount!: number;
}
