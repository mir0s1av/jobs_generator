import { JobMessageMetadata } from '@libs/nestjs';
import { Job } from '../decorators/jobs.decorator';
import { AbstractJob } from './abstract.job';
import { PulsarClient, FibonacciMessage } from '@libs/pulsar';
import { PrismaService } from '../prisma/prisma.service';

@Job({
  name: JobMessageMetadata.FIBONACCI,
  description: 'generate Fib sequance and store in db',
})
export class FibonacciJob extends AbstractJob<FibonacciMessage> {
  protected messageClass = FibonacciMessage;
  constructor(pulsarClient: PulsarClient, prismaService: PrismaService) {
    super(pulsarClient, prismaService);
  }
}
