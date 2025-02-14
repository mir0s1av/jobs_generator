import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { and, eq, SQL } from 'drizzle-orm';

export type Filters = Partial<
  Omit<typeof schema.categories.$inferSelect, 'id' | 'uuid' | 'updated_at'>
>;

@Injectable()
export class CategoriesRepository {
  private query = this.db.query.categories;

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}
  async findBy(filters: Filters) {
    const queryBuilder = and();
    this.buildWhere(filters, queryBuilder);

    return this.query.findFirst({ where: queryBuilder });
  }

  private buildWhere(filters: Filters, queryBuilder: SQL<unknown>) {
    Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => {
        queryBuilder.append(eq(schema.categories[key], value));
      });
  }
}
