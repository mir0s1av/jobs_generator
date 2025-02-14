import { Module } from '@nestjs/common';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';
import { PulsarModule } from '@libs/pulsar';
import { LoadProductsModule } from './products/load-products.module';

@Module({
  imports: [PulsarModule, LoadProductsModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
