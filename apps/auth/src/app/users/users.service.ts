import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { UsersRepository } from './users.respository';
import { PaginationArgs } from '@jobs-generator/nestjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUsers(pagination: PaginationArgs) {
    return this.usersRepository.findMany(pagination);
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
