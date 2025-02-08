import { AbstractModel, PageInfo } from '@jobs-generator/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}

@ObjectType()
class Edge {
  @Field(() => String)
  cursor: string;

  @Field(() => User)
  node: User;
}

@ObjectType()
export class PaginatedType {
  @Field(() => [Edge])
  edges: Array<Edge>;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

// Generate paginated type for User
