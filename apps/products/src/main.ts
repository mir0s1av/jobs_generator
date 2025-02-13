import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { configureApp } from '@libs/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const port = app.get(ConfigService).getOrThrow('PORT');
  app.use(cookieParser.default());
  configureApp(app, port);
}

bootstrap();
