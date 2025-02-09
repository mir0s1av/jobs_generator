import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
@ObjectType({ isAbstract: true })
export class AbstractModel {
  @Field(() => ID)
  uuid: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
