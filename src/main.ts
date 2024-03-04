import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { SpelunkerModule } from 'nestjs-spelunker'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // console.log(SpelunkerModule.explore(app));

  const {
    api: { port }
  } = app.get(ConfigService).get('app');

  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.use(cookieParser())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('influenly API')
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

  await app.listen(port);
  Logger.log(`API listening on port ${port}`);
}
bootstrap();
