import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './login-input.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './toke-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser({ email, password });
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRES_IN'))
    );
    const tokenPayload: TokenPayload = {
      userId: user.uuid,
    };
    const accessToken = this.jwtService.sign(tokenPayload);
    console.log({ accessToken });
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
    });

    return user;
  }

  private async verifyUser({ email, password }: LoginInput) {
    try {
      const user = await this.usersService.findBy({ email });
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
