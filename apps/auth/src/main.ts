import { GrpcOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { configureApp } from '@jobs-generator/nestjs';
import { AUTH_PACKAGE_NAME } from '@jobs-generator/proto-types';
import { ConfigService } from '@nestjs/config';

import { join } from 'path';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).getOrThrow('PORT');
  configureApp(app, port);
  app.use(cookieParser());
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });
  app.startAllMicroservices();
}

bootstrap();
