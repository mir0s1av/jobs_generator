import { Type } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

// @InputType()
// export class PaginationArgs {
//   @Field(() => Int, { nullable: true })
//   take?: number = 10; // Default to 10 items per page

//   @Field(() => String, { nullable: true })
//   cursor?: string;
// }

// export function Paginated<T>(classRef: Type<T>) {
//   @ObjectType({ isAbstract: true }) // Mark it as abstract to prevent GraphQL schema exposure
//   abstract class PaginatedType {
//     @Field(() => [classRef])
//     items: T[];

//     @Field(() => Boolean)
//     hasNextPage: boolean;

//     @Field(() => Int, { nullable: true })
//     totalCount?: number; // Optional total count field
//   }

//   return PaginatedType;
// }

@InputType()
export class PaginationArgs {
  @Field({ nullable: true })
  after?: string; // Cursor for pagination

  @Field({ nullable: true })
  first?: number; // Number of records to fetch
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;
}
