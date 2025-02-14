import { Injectable } from '@nestjs/common';

import { iterate } from 'fibonacci';

import {
  AbstractPulsarConsumer,
  FibonacciMessage,
  PulsarClient,
} from '@libs/pulsar';
import { JobMessageMetadata } from '@libs/nestjs';

@Injectable()
export class FibonacciConsumer extends AbstractPulsarConsumer<FibonacciMessage> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, JobMessageMetadata.FIBONACCI);
  }

  protected async onMessage(data: FibonacciMessage): Promise<void> {
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}
