import {
  date,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
};
const identifiers = {
  id: serial('id').primaryKey(),
  uuid: text('uuid').unique(),
};
export const products = pgTable('products', {
  ...identifiers,
  name: text('name'),
  category: text('category'),
  price: real('price'),
  stock: integer('stock'),
  rating: real('rating'),
  description: text('description'),
  ...timestamps,
});
