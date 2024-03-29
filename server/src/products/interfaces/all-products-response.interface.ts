import { Product } from '../../entities/products.entity';

export interface AllProductsResponse {
  products: Product[];
  totalFound: number;
}
