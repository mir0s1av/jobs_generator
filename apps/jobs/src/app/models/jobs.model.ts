import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { JobStatus } from '../inerfaces/job-metadata.interface';

registerEnumType(JobStatus, {
  name: 'JobStatus',
  description: 'Jobs',
});

@ObjectType()
export class Job {
  @Field(() => ID)
  uuid: string;
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  size: number;

  @Field()
  started: Date;

  @Field({ nullable: true })
  ended?: Date;

  @Field(() => JobStatus)
  status: JobStatus;
}
