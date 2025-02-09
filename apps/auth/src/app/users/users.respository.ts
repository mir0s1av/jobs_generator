import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/auth';
import { paginate, PaginationArgs } from '@jobs-generator/nestjs';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
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
}
