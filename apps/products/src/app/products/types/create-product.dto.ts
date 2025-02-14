import * as schema from '../schema';
export type CreateProductDto = Omit<
  typeof schema.products.$inferSelect,
  'id' | 'uuid' | 'updated_at' | 'created_at'
>;
