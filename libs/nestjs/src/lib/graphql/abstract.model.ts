import { ObjectType, Field, ID } from '@nestjs/graphql';
@ObjectType({ isAbstract: true })
export class AbstractModel {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  created_at: string;
  @Field(() => String)
  updated_at: string;
}
