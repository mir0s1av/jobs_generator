import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
export async function configureApp(app: INestApplication, port: number) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  //   app.use(cookieParser.default());
  const globalPrefix = 'api';
  const logger = app.get(Logger);
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(logger);
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  return app;
}
