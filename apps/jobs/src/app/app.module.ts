import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PinoLoggerModule } from '@libs/nestjs';
import { GqlLoggerPlugin } from '@libs/graphql';
import { UploadsModule } from './uploads/uploads.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UploadsModule,
    PinoLoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JobsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      plugins: [new GqlLoggerPlugin()],
      useGlobalPrefix: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
  ],
})
export class AppModule {}
