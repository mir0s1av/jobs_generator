import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@libs/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import {
  JobExecutationPayload,
  JobStatus,
} from '../inerfaces/job-metadata.interface';
import { PrismaService } from '../prisma/prisma.service';
export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;
  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly prismaService: PrismaService
  ) {}

  async execute({ payload, jobName, uuid }: JobExecutationPayload<T>) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }

    await this.prismaService.job.create({
      data: {
        name: jobName,
        uuid,
        size: Array.isArray(payload) ? payload.length : 1,
        completed: 0,
        status: JobStatus.IN_PROGRESS,
      },
    });

    if (Array.isArray(payload)) {
      for (const message of payload) {
        await this.send({ ...message, jobId: uuid });
      }
      return;
    }

    this.send({ ...payload, jobId: uuid });
    console.log(`Job has been executted :: ${uuid}`);
  }

  private async send(data: T) {
    this.validateData(data).then(() =>
      this.producer.send({ data: serialize(data) })
    );
  }

  private async validateData(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length) {
      throw new BadRequestException(
        `Job data is invalid :: ${JSON.stringify(errors)}`
      );
    }
  }
}
