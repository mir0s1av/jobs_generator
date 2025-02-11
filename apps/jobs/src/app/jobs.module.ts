import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonachi.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@libs/grpc';
import { PulsarModule } from '@libs/pulsar';

@Module({
  imports: [
    PulsarModule,
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
        },
      },
    ]),
    DiscoveryModule,
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
