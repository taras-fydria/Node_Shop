import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export function appOpenAPI() {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Product')
    .setDescription('Products API')
    .build();

  const setup = (app: NestFastifyApplication) => {
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('api', app, document);
  };

  return { setup };
}
