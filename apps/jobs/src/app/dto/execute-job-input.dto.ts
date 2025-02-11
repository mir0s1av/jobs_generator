import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import JSON from 'graphql-type-json';
@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  uuid: string;

  @Field(() => JSON)
  @IsNotEmpty()
  data: object | object[];
}
