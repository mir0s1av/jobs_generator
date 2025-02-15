import {
  CreateProductManyRequest,
  CreateProductManyResponse,
  CreateProductRequest,
  CreateProductResponse,
  GrpcLoggerInterceptor,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@libs/grpc';
import { Controller, UseInterceptors } from '@nestjs/common';
import { firstValueFrom, from, Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Controller()
@ProductsServiceControllerMethods()
@UseInterceptors(GrpcLoggerInterceptor)
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}
  createProductMany(
    request: CreateProductManyRequest
  ):
    | Promise<CreateProductManyResponse>
    | Observable<CreateProductManyResponse>
    | CreateProductManyResponse {
    return from(
      this.productsService.createMany(request.products).then((result) => ({
        responses: result,
      }))
    );
  }
  createProduct(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse {
    return this.productsService.createProduct(request);
  }
}
