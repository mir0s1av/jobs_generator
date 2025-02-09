import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { moduleMetadata } from './authentication.module';
import { ConfigService } from '@nestjs/config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

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

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
