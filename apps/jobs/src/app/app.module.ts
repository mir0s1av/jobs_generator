import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PinoLoggerModule } from '@libs/nestjs';
import { GqlLoggerPlugin } from '@libs/graphql';

@Module({
  imports: [
    PinoLoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JobsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      plugins: [new GqlLoggerPlugin()],
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
  ],
})
export class AppModule {}
