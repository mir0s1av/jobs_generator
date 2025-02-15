import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
export async function configureApp(
  app: INestApplication,
  port: number,
  globalPrefix = 'api'
) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const logger = app.get(Logger);
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(logger);
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  return app;
}
