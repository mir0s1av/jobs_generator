import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Consumer, Message, Producer } from 'pulsar-client';
@Injectable()
export class PulsarClient implements OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}
  private pulsarClient = new Client({
    serviceUrl: this.configService.getOrThrow('PULSAR_URL'),
    operationTimeoutSeconds: 30,
  });
  private producers: Producer[] = [];
  private consumers: Consumer[] = [];
  async onModuleDestroy() {
    for (const producer of this.producers) {
      await producer.close();
    }
    for (const consumer of this.consumers) {
      await consumer.close();
    }
    await this.pulsarClient.close();
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.pulsarClient.subscribe({
      subscriptionType: 'Shared',
      topic,
      subscription: 'jobber',
      listener,
    });
    this.consumers.push(consumer);
    return consumer;
  }

  async createProducer(topic: string) {
    const producer = await this.pulsarClient.createProducer({
      topic,
    });
    this.producers.push(producer);
    return producer;
  }
}
