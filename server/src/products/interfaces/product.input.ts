import { Product } from '../../entities/products.entity';

export interface ProductInput
  extends Omit<Product, 'createTimeStamp' | 'id' | 'category'> {}
