import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './types/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}
  async create(product: CreateProductDto) {
    return await this.db
      .insert(schema.products)
      .values({ ...product, uuid: uuidv4() })
      .returning();
  }
}
