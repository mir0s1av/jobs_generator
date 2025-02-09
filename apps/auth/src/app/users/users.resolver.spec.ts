import { Test, TestingModule } from '@nestjs/testing';
import { usersModuleMetadata } from './users.module';
import { UsersResolver } from './users.resolver';
describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      usersModuleMetadata
    ).compile();
    resolver = module.get<UsersResolver>(UsersResolver);
  });
  it('should be defined ', async () => {
    expect(resolver).toBeDefined();
  });
});
