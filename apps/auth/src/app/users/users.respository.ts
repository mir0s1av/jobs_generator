import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/auth';
import { paginate, PaginationArgs } from '@jobs-generator/nestjs';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
export type Filters = Omit<
  Prisma.UserWhereUniqueInput,
  'AND' | 'OR' | 'NOT' | 'password'
> & { email: string };

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Omit<Prisma.UserCreateInput, 'uuid'>) {
    return this.prismaService.user.create({
      data: {
        ...data,
        uuid: uuidv4(),
        password: await hash(data.password, 10),
      },
    });
  }

  async findMany({ first, after }: PaginationArgs) {
    const users = await this.prismaService.user.findMany({
      take: first ?? 10,
      skip: after ? 1 : 0,
      orderBy: { id: 'asc' },
    });

    // Create edges array
    return paginate(users, first);
  }

  async findBy(filters: Filters) {
    return this.prismaService.user.findUniqueOrThrow({ where: filters });
  }
}
