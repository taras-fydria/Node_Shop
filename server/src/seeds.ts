import { NestFactory } from '@nestjs/core';
import { SeedsModule } from './seeds/seeds.module';
import { Logger } from '@nestjs/common';
import { SeedsProvider } from './seeds/seeds.provider';

async function bootstrap() {
  try {
    const applicationContext =
      await NestFactory.createApplicationContext(SeedsModule);
    const logger = applicationContext.get(Logger);
    const seeder = applicationContext.get(SeedsProvider);
    try {
      await seeder.seed();
      logger.debug('Seeding Complete');
    } catch (e) {
      logger.error('Seeding failed');
    } finally {
      await applicationContext.close();
    }
  } catch (e) {}
}

bootstrap();
