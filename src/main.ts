import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    api: { port }
  } = app.get(ConfigService).get('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Content API')
    .setDescription('MVP Api :)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  app.enableCors();

  await app.listen(port);
  Logger.log(`API listening on port ${port}`);
}
bootstrap();
