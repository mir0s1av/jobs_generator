import { Injectable, Logger } from '@nestjs/common';

import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';
import { v4 as uuidv4 } from 'uuid';
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

  async createMany(products: CreateProductDto[]) {
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        const category = await this.categoriesService.findBy({
          name: product.category,
        });
        return {
          ...product,
          price: category ? category.charge + product.price : product.price,
        };
      })
    );
    return await this.productsRepository.createMany(enrichedProducts);
  }
}
