import { Category } from '../../entities/categories.entity';

export interface CreateCategory extends Omit<Category, 'id' | 'products'> {}
