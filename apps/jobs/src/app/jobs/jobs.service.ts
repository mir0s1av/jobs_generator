import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from '../decorators/jobs.decorator';
import { AbstractJob } from './abstract.job';
import { ExecuteJobInput } from './dto/execute-job-input.dto';
import { JobMetadata } from '../inerfaces/job-metadata.interface';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(private readonly discoveryService: DiscoveryService) {}
  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob({ uuid }: ExecuteJobInput) {
    const job = this.jobs.find((job) => job.meta.uuid === uuid);
    if (!job) {
      throw new BadRequestException(`Job with ID :: ${uuid} is not found`);
    }
    await (job.discoveredClass.instance as AbstractJob).execute();
    return job.meta;
  }
}
