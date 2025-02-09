import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResolver } from './authentication.resolver';
import { moduleMetadata } from './authentication.module';
import { ConfigService } from '@nestjs/config';

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;

  beforeEach(async () => {
    const mockConfigService = {
      getOrThrow: jest.fn((key) => {
        const env = { JWT_SECRET: 'test-secret', JWT_EXPIRES_IN: '3600s' };
        return env[key];
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      ...moduleMetadata,
      providers: [
        ...moduleMetadata.providers,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
