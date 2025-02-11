import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  first?: number;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;
}
