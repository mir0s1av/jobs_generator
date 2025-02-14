import {
  AcknowledgeRequest,
  JOBS_SERVICE_NAME,
  JobsServiceClient,
} from '@libs/grpc';
import {
  // AbstractPulsarConsumer,
  deserialize,
  PulsarClient,
} from '@libs/pulsar';
import { Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Consumer, Message } from 'pulsar-client';
import { firstValueFrom } from 'rxjs';
export abstract class JobConsumer<T extends AcknowledgeRequest> {
  private jobsService: JobsServiceClient;
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);
  constructor(
    private readonly topic: string,
    private readonly pulsarClient: PulsarClient,
    private readonly clientGrpc: ClientGrpc
  ) {}
  async onModuleInit() {
    this.jobsService =
      this.clientGrpc.getService<JobsServiceClient>(JOBS_SERVICE_NAME);
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

  protected async onMessage(data: T): Promise<void> {
    await this.execute(data);

    await firstValueFrom(this.jobsService.acknowledge(data));
  }

  protected abstract execute(data: T): Promise<void>;

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());
      this.logger.debug(`Received message :: ${data}`);
      await this.onMessage(data);
    } catch (e) {
      this.logger.error(e);
    } finally {
      await this.consumer.acknowledge(message);
    }
  }
}
