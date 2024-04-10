import { ProductsEntity } from '../../entities/products.entity';

export interface AllProductsResponse {
  products: ProductsEntity[];
  totalFound: number;
}
