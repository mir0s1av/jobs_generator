import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { configureApp } from '@jobs-generator/nestjs';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).getOrThrow('PORT');
  configureApp(app, port);
}

bootstrap();
