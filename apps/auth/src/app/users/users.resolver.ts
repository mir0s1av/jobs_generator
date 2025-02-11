import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

import { PaginatedType, User } from './models/users.model';
import { CreateUserDto } from './createUser.dto';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../authentication/guards/gql-auth.guard';
import { PaginationArgs } from '@libs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedType)
  users(@Args('pagination') pagination: PaginationArgs) {
    return this.usersService.getUsers(pagination);
  }

  @Mutation(() => User)
  createUser(@Args('input') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
