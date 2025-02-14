import { Module } from '@nestjs/common';
import { LoadProductsConsumer } from './load-products.consumer';
import { PulsarModule } from '@libs/pulsar';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { Packages, PRODUCTS_SERVICE_NAME } from '@libs/grpc';
import { join } from 'path';
import { JobsClientModule } from '../jobs-client.module';

@Module({
  imports: [
    JobsClientModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: PRODUCTS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('PRODUCTS_GRPC_SERVICE_URL'),
            package: Packages.PRODUCTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../libs/grpc/proto/products.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [LoadProductsConsumer],
})
export class LoadProductsModule {}
