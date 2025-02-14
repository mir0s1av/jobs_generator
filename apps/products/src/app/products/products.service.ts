import { Injectable, Logger } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';

import { CreateProductDto } from './types/create-product.dto';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService
  ) {}
  async createProduct(product: CreateProductDto) {
    const category = await this.categoriesService.findBy({
      name: product.category,
    });
    this.logger.log(`Creating product ${product.name}`);
    return await this.productsRepository.create({
      ...product,
      price: category ? category.charge + product.price : product.price,
    });
  }
}
