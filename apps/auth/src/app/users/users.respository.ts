import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/auth';
import { PaginationArgs } from '@jobs-generator/nestjs';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async findMany({ first, after }: PaginationArgs) {
    const users = await this.prismaService.user.findMany({
      take: first ?? 10,
      skip: after ? 1 : 0,
      orderBy: { id: 'asc' },
    });

    // Create edges array
    const edges = users.slice(0, first).map((user) => ({
      node: user,
      cursor: user.id,
    }));

    // Determine if there's a next page
    const hasNextPage = users.length > first;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    };
  }
}
