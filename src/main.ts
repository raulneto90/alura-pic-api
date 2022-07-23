import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as packageJson from '../package.json';
import { AppModule } from './app.module';
import { AppExceptionFilters } from './exception.filter';
import { ClassValidatorPipe } from './validation.pipe';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    new ClassValidatorPipe({ transform: true, whitelist: true }),
  );
  app.useGlobalFilters(new AppExceptionFilters());

  const port = process.env.NODE_ENV || 3000;

  await app.listen(port, () => {
    logger.log(`Server started on port ${port}`);
  });
}
bootstrap();
