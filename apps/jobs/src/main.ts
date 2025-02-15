require('module-alias/register');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

import { configureApp } from '@libs/nestjs';
import * as cookieParser from 'cookie-parser';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Packages } from '@libs/grpc';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const getVariable = (r: string) => app.get(ConfigService).getOrThrow(r);
  const port = getVariable('PORT');
  app.use(cookieParser.default());
  configureApp(app, port, 'jobs');
  app.connectMicroservice<GrpcOptions>({
    options: {
      url: getVariable('JOBS_GRPC_SERVICE_URL'),
      package: Packages.JOBS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/jobs.proto'),
    },
    transport: Transport.GRPC,
  });
  app.startAllMicroservices();
}

bootstrap();
