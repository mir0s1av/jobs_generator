import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'libs/grpc/src/lib/types';
import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './toke-payload.interface';

@AuthServiceControllerMethods()
@Controller()
export class AuthenticationController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.usersService.findBy({ uuid: request.user.userId });
  }
}
