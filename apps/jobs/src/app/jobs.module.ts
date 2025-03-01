import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonachi.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { Packages, AUTH_SERVICE_NAME } from '@libs/grpc';
import { PulsarModule } from '@libs/pulsar';
import { ConfigService } from '@nestjs/config';
import { LoadProductsJob } from './jobs/products/load-products.job';
import { PrismaModule } from './prisma/prisma.module';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
    PrismaModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: Packages.AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    DiscoveryModule,
  ],
  controllers: [JobsController],
  providers: [FibonacciJob, LoadProductsJob, JobsService, JobsResolver],
})
export class JobsModule {}
