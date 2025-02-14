import { Pool } from 'pg';
import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './constants';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as productSchema from '../products/schema';
import * as categoriesSchema from '../categories/schema';

const schema = { ...productSchema, ...categoriesSchema };

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.getOrThrow('DATABASE_URL');
        const pool = new Pool({
          connectionString,
        });
        return drizzle(pool, {
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
