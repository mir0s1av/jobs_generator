import { LoadProductsMessage, PulsarClient } from '@libs/pulsar';
import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/jobs.decorator';
import { JobMessageMetadata } from '@libs/nestjs';

@Job({
  name: JobMessageMetadata.PRODUCTS_LOAD,
  description: 'Load products from external source',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
