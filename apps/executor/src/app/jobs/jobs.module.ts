import { Module } from '@nestjs/common';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';
import { PulsarModule } from '@libs/pulsar';
import { LoadProductsModule } from './products/load-products.module';
import { JobsClientModule } from './jobs-client.module';

@Module({
  imports: [PulsarModule, LoadProductsModule, JobsClientModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
