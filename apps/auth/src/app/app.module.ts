import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { PinoLoggerModule } from '@libs/nestjs';
import { GqlLoggerPlugin } from '@libs/graphql';

@Module({
  imports: [
    PinoLoggerModule,
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({
        req,
        res,
      }),
      useGlobalPrefix: true,
      plugins: [new GqlLoggerPlugin()],
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
