import { Product } from '../../entities/products.entity';

export enum Order {
  ASC = 'ASC',

  DESC = 'DESC',
}

export interface ProductGetParams {
  offset?: number;
  paged?: number;
  limit?: number;
  order?: Order;
  orderBy?: string;
}
