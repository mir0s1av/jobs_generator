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
import { ExecuteJobInput } from './dto/execute-job-input.dto';
import { JobMetadata } from './inerfaces/job-metadata.interface';
import { readFileSync } from 'fs';
import { UPLOAD_PATH } from './uploads/uploads.constants';

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

  async executeJob({ uuid, data }: any) {
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
}
