import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Filters } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  async findBy(filters: Filters) {
    return this.repository.findBy(filters);
  }
}
