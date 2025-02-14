import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from './decorators/jobs.decorator';
import { AbstractJob } from './jobs/abstract.job';
import { JobMetadata, JobStatus } from './inerfaces/job-metadata.interface';
import { readFileSync } from 'fs';
import { UPLOAD_PATH } from './uploads/uploads.constants';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly repository: JobsRepository
  ) {}
  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob({ uuid, data }) {
    const job = this.jobs.find((job) => job.meta.uuid === uuid);

    if (!job) {
      throw new BadRequestException(`Job with ID :: ${uuid} is not found`);
    }
    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        'Job is not an instace of Abstract Job'
      );
    }
    await job.discoveredClass.instance.execute({
      payload: data.fileName ? this.getFile(data.fileName) : data,
      jobName: job.meta.name,
      uuid,
    });
    return job.meta;
  }

  async getFile(filename?: string) {
    if (!filename) {
      return;
    }
    try {
      return JSON.parse(readFileSync(`${UPLOAD_PATH}/${filename}`, 'utf-8'));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to read file :: ${filename}`
      );
    }
  }

  async acknowledge(jobId: string) {
    const job = await this.repository.findBy({ uuid: jobId });

    if (!job) {
      throw new BadRequestException(`Job with ID :: ${jobId} is not found`);
    }
    if (job.ended) {
      return;
    }

    const updatedJob = await this.repository.update({
      uuid: jobId,
      completed: 1,
    });

    if (updatedJob.completed === job.size) {
      await this.repository.update({
        uuid: jobId,
        ended: new Date(),
        status: JobStatus.COMPLETED,
      });
    }
    return updatedJob;
  }
}
