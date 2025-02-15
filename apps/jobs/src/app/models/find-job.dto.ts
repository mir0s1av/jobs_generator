import { Field, InputType } from '@nestjs/graphql';
import { JobStatus } from '../inerfaces/job-metadata.interface';

@InputType()
export class FindJobInput {
  @Field()
  uuid?: string;

  @Field()
  name?: string;

  @Field()
  started?: Date;

  @Field()
  ended?: Date;

  @Field()
  status?: JobStatus;
}
