require('module-alias/register');
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { configureApp } from '@libs/nestjs';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Packages } from '@libs/grpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const getVariable = (r: string) => app.get(ConfigService).getOrThrow(r);
  const port = getVariable('PORT');
  app.use(cookieParser.default());
  configureApp(app, port);
  app.connectMicroservice<GrpcOptions>({
    options: {
      url: getVariable('PRODUCTS_GRPC_SERVICE_URL'),
      package: Packages.PRODUCTS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/products.proto'),
    },
    transport: Transport.GRPC,
  });
  app.startAllMicroservices();
}

bootstrap();
