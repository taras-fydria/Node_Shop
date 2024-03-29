import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto';
import { fa, faker } from '@faker-js/faker';

@Injectable()
export class SeedsProvider {
  constructor(
    private readonly logger: Logger,
    private readonly productsService: ProductsService,
  ) {}

  async seed() {
    try {
      await this.products();
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
}
