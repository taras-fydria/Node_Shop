import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto';
import { fa, faker, th } from '@faker-js/faker';
import { CreateCategoryDto } from '../categories/dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class SeedsProvider {
  constructor(
    private readonly logger: Logger,
    private readonly categoryService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async seed() {
    try {
      await this.products();
      await this.categories();
    } catch (e) {
      this.logger.error('Failed seeding data');
    }
  }

  async products(): Promise<void> {
    try {
      for await (const _ of new Array(1000)) {
        const product: CreateProductDto = {
          productName: faker.commerce.productName(),
          productDescription: faker.commerce.productDescription(),
          quantityPerUnit: faker.number.int({ min: 1, max: 100 }),
          unitsInStock: faker.number.int({ min: 0, max: 100000 }),
          discount: faker.number.float({ min: 0, max: 99, fractionDigits: 2 }),
        };

        await this.productsService.createNew(product);
      }

      const result = await this.productsService.getAllProductsCount();
      this.logger.debug(
        `Successfully completed seeding products. Was created ${result} products`,
      );
    } catch (e) {
      this.logger.error(`Failed seeding products. ${e}`);
    }
  }

  async categories(): Promise<void> {
    try {
      for await (const _ of new Array(100)) {
        const category: CreateCategoryDto = {
          categoryName: faker.commerce.department(),
          description: faker.lorem.text(),
        };

        await this.categoryService.create(category);
      }
      const result = await this.categoryService.getAllCategoriesCount();

      this.logger.log(`Was created ${result} categories`);
    } catch (e) {
      this.logger.error(e.message, e.statusCode);
    }
  }
}
