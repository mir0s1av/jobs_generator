import { Inject, Injectable } from '@nestjs/common';

import { iterate } from 'fibonacci';

import { FibonacciMessage, PulsarClient } from '@libs/pulsar';
import { JobMessageMetadata } from '@libs/nestjs';
import { JobConsumer } from '../job.consumer';
import { Packages } from '@libs/grpc';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FibonacciConsumer extends JobConsumer<FibonacciMessage> {
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS_PACKAGE_NAME) jobsClient: ClientGrpc
  ) {
    super(JobMessageMetadata.FIBONACCI, pulsarClient, jobsClient);
  }

  protected async execute(data: FibonacciMessage[]): Promise<void> {
    const batchResult = await Promise.all(
      data.map((item) => iterate(item.iterations))
    );
    this.logger.log(`Fibonacci messages executed :: ${batchResult}`);
  }
}
