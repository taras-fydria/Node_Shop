import { CategoryEntity } from '../../entities/categories.entity';

export interface CreateCategory
  extends Omit<CategoryEntity, 'id' | 'products'> {}
