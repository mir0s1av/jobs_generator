import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field(() => ID)
  uuid: string;
  @Field()
  name: string;

  @Field()
  description: string;
}
