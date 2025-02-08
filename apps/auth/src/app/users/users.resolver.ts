import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

import { PaginatedType, User } from './models/users.model';
import { CreateUserDto } from './createUser.dto';
import { PaginationArgs } from '@jobs-generator/nestjs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedType)
  users(@Args('pagination') pagination: PaginationArgs) {
    return this.usersService.getUsers(pagination);
  }

  @Mutation(() => User)
  createUser(@Args('input') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
