import { CartEntity } from '../../entities/cart.entity';

export interface CreateCartItem extends Omit<CartEntity, 'id'> {}
