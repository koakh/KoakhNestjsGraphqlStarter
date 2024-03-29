import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { LoginUserInput } from '../input-types';

@Injectable()
export class GqlLocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // get loginUserData from context args
    const loginUserData: LoginUserInput = ctx.getArgs().loginUserData;
    // call authService validateUser
    const user = await this.authService.validateUser(loginUserData.username, loginUserData.password);
    // if not null is valid
    return (user);
  }

  /**
   * Passport expects a validate() method with the following signature: validate(username: string, password:string): any
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    debugger;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
