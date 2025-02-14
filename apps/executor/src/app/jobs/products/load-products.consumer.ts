import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { LoadProductsMessage, PulsarClient } from '@libs/pulsar';
import { JobMessageMetadata } from '@libs/nestjs';
import {
  Packages,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@libs/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JobConsumer } from '../job.consumer';

@Injectable()
export class LoadProductsConsumer
  extends JobConsumer<LoadProductsMessage>
  implements OnModuleInit
{
  private productsService: ProductsServiceClient;
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS_PACKAGE_NAME) clientJobs: ClientGrpc,
    @Inject(Packages.PRODUCTS_PACKAGE_NAME)
    private readonly clientProducts: ClientGrpc
  ) {
    super(JobMessageMetadata.PRODUCTS_LOAD, pulsarClient, clientJobs);
  }
  async onModuleInit(): Promise<void> {
    this.productsService =
      this.clientProducts.getService<ProductsServiceClient>(
        PRODUCTS_SERVICE_NAME
      );
    await super.onModuleInit();
  }
  protected async execute(data: LoadProductsMessage): Promise<void> {
    await firstValueFrom(this.productsService.createProduct(data));
    this.logger.log(data);
  }
}
