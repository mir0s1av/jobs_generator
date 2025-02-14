import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import {
  AbstractPulsarConsumer,
  LoadProductsMessage,
  PulsarClient,
} from '@libs/pulsar';
import { JobMessageMetadata } from '@libs/nestjs';
import {
  Packages,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@libs/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoadProductsConsumer
  extends AbstractPulsarConsumer<LoadProductsMessage>
  implements OnModuleInit
{
  private productsService: ProductsServiceClient;
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.PRODUCTS_PACKAGE_NAME) private client: ClientGrpc
  ) {
    super(pulsarClient, JobMessageMetadata.PRODUCTS_LOAD);
  }
  async onModuleInit(): Promise<void> {
    this.productsService = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME
    );
    await super.onModuleInit();
  }
  protected async onMessage(data: LoadProductsMessage): Promise<void> {
    // const result = iterate(data.iterations);
    await firstValueFrom(this.productsService.createProduct(data));
    this.logger.log(data);
  }
}
