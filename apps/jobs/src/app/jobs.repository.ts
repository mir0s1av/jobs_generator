import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/jobs';
import { PrismaService } from './prisma/prisma.service';
import { JobFilters } from './inerfaces/job-metadata.interface';

@Injectable()
export class JobsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findBy(filters: JobFilters) {
    return this.prismaService.job.findFirst({ where: filters });
  }
  async update(payload: Prisma.JobUpdateInput) {
    return this.prismaService.job.update({
      where: { uuid: payload.uuid as string },
      data: payload,
    });
  }
}
