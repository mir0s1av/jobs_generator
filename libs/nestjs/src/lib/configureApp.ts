import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

export async function configureApp(app: INestApplication, port: number) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  //   app.use(cookieParser.default());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  return app;
}
