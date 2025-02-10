import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadata } from '../inerfaces/job-metadata.interface';
import { v4 as uuidv4 } from 'uuid';
export const JOB_METADATA_KEY = 'job_metadata';

export const Job = (meta: JobMetadata) =>
  applyDecorators(
    SetMetadata(JOB_METADATA_KEY, { ...meta, uuid: uuidv4() }),
    Injectable()
  );
