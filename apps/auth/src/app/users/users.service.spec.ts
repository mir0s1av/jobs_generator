import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { usersModuleMetadata } from './users.module';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      usersModuleMetadata
    ).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('should be defined ', async () => {
    expect(service).toBeDefined();
  });
});
