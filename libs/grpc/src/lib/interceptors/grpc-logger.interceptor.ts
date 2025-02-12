import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GrpcLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GrpcLoggerInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const handler = context.getHandler().name;
    const args = context.getArgs()[0];
    const start = Date.now();
    const requestId = uuidv4();
    this.logger.log({
      requestId,
      args,
      handler,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          requestId,
          duration: Date.now() - start,
          handler,
        });
      })
    );
  }
}
