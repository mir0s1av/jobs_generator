import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonachi.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
} from '@jobs-generator/proto-types';
import { join } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
    DiscoveryModule,
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
