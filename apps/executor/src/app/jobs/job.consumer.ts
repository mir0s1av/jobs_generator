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
import { Consumer } from 'pulsar-client';

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
      this.messagelistener.bind(this)
    );
  }

  // protected async onMessage(data: T): Promise<void> {
  //   await this.execute(data);

  //   await firstValueFrom(this.jobsService.acknowledge(data));
  // }
  protected async onMessage(data: T[]): Promise<void> {
    await this.execute(data);

    this.jobsService.acknowledge({ jobId: data[0].jobId });
  }

  protected abstract execute(data: T[]): Promise<void>;

  // private async listener(message: Message) {
  //   while (true) {
  //     try {
  //       const messages = await this.consumer.batchReceive();
  //       if (messages.length === 0) continue;
  //       this.logger.debug(`Received batch of ${messages.length} messages`);
  //       await Promise.all(
  //         messages.map((mes) => {
  //           const data = deserialize<T>(mes.getData());
  //           this.logger.debug(`Received message :: ${data}`);
  //           this.onMessage(data);
  //         })
  //       );
  //     } catch (e) {
  //       this.logger.error(e);
  //     } finally {
  //       await this.consumer.acknowledge(message);
  //     }
  //   }
  // }

  private async messagelistener() {
    try {
      const messages = await this.consumer.batchReceive();
      if (messages.length === 0) return;
      this.logger.debug(`Received batch of ${messages.length} messages`);
      const batchData = await Promise.all(
        messages.map((mes) => {
          return deserialize<T>(mes.getData());
        })
      );
      this.onMessage(batchData);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
