import { Prisma } from '@prisma-clients/jobs';

export interface JobMetadata {
  uuid?: string;
  name: string;
  description: string;
}

export interface JobExecutationPayload<T> {
  uuid: string;
  payload: T;
  jobName: string;
}

export enum JobStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type JobFilters = Omit<Prisma.JobWhereUniqueInput, 'AND' | 'OR' | 'NOT'>;

export type UpdateJobDto = Prisma.JobUpdateInput;
