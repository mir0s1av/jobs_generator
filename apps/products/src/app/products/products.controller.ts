import {
  CreateProductRequest,
  CreateProductResponse,
  GrpcLoggerInterceptor,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@libs/grpc';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Controller()
@ProductsServiceControllerMethods()
@UseInterceptors(GrpcLoggerInterceptor)
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}
  createProduct(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse {
    return this.productsService.createProduct(request);
  }
}
