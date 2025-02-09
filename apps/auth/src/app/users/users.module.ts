import { Module, ModuleMetadata } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './users.respository';
import { PrismaModule } from '../prisma/prisma.module';

export const usersModuleMetadata: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [UsersService, UsersResolver, UsersRepository],
  exports: [UsersService, UsersResolver, UsersRepository],
};

@Module(usersModuleMetadata)
export class UsersModule {}
