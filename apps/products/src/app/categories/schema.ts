import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
const timestamps = {
  updated_at: timestamp('updated_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
};
const identifiers = {
  id: serial('id').primaryKey(),
  uuid: text('uuid').unique(),
};
export const categories = pgTable('categories', {
  ...identifiers,
  name: text('name').unique(),
  charge: integer('charge'),
  ...timestamps,
});
