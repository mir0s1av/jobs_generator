import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pulsar-client';
@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private pulsarClient = new Client({
    serviceUrl: this.configService.getOrThrow('PULSAR_URL'),
    operationTimeoutSeconds: 30,
  });
  constructor(private readonly configService: ConfigService) {}
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  createProducer(topic: string) {
    return this.pulsarClient.createProducer({
      topic,
    });
  }
}
