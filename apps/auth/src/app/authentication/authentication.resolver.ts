import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/users.model';
import { LoginInput } from './login-input.dto';
import { GqlContext } from '@jobs-generator/nestjs';
import { AuthenticationService } from './authentication.service';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => User)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: GqlContext
  ): Promise<User> {
    return this.authenticationService.login(input, context.res);
  }
}
