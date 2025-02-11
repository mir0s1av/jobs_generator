import { Injectable } from '@nestjs/common';
import { AbstractPulsarConsumer, PulsarClient } from '@jobs-generator/pulsar';
import { iterate } from 'fibonacci';
import { FibonacciData } from './fibonacci.interface';

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
