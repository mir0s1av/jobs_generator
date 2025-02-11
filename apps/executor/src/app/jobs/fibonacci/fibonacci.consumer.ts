import { Injectable } from '@nestjs/common';

import { iterate } from 'fibonacci';
import { FibonacciData } from './fibonacci.interface';
import { AbstractPulsarConsumer, PulsarClient } from '@libs/pulsar';

@Injectable()
export class FibonacciConsumer extends AbstractPulsarConsumer<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(data: FibonacciData): Promise<void> {
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}
