import { Job } from '../decorators/jobs.decorator';
import { FibonacciData } from '../inerfaces/job-metadata.interface';
import { AbstractJob } from './abstract.job';

import { PulsarClient } from '@jobs-generator/pulsar';

@Job({
  name: 'Fibonacci',
  description: 'generate Fib sequance and store in db',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  protected messageClass = FibonacciData;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
