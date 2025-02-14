import { Module } from '@nestjs/common';
import { PulsarClient } from './pulsar.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [PulsarClient],
  exports: [PulsarClient],
})
export class PulsarModule {}
