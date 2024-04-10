import { ProductsEntity } from '../../entities/products.entity';

export interface ProductInput
  extends Omit<ProductsEntity, 'createTimeStamp' | 'id' | 'category'> {}
