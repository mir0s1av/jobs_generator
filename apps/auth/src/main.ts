require('module-alias/register');
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { configureApp } from '@libs/nestjs';

import { ConfigService } from '@nestjs/config';

import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { Packages } from '@libs/grpc';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const getVariable = (r: string) => app.get(ConfigService).getOrThrow(r);
  const port = getVariable('PORT');
  await configureApp(app, port);
  app.use(cookieParser());
  app.connectMicroservice<GrpcOptions>({
    options: {
      url: getVariable('GRPC_URL'),
      package: Packages.AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
    },
    transport: Transport.GRPC,
  });
  app.startAllMicroservices();
}

bootstrap();
