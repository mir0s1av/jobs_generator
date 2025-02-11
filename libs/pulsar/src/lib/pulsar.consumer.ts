import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { Logger, OnModuleInit } from '@nestjs/common';
import { deserialize } from './serialize';

export abstract class AbstractPulsarConsumer<T> implements OnModuleInit {
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);
  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  protected abstract onMessage(data: T): Promise<void>;

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

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
