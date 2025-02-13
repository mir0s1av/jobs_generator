import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonachi.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@libs/grpc';
import { PulsarModule } from '@libs/pulsar';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('GRPC_SERVICE_URL'),
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    DiscoveryModule,
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
