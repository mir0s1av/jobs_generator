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
