import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ValidateUserDto } from './dto';
import { adminCurrentUser } from './auth-user.service';

@Controller()
export class AuthClientController {
  constructor(private readonly nestGraphqlAuthService: AuthService) { }

  // curl -X POST localhost:3000/validate-user -d '{ "username" : "admin", "password": "12345678" }' -H 'Content-Type: application/json' | jq
  @Post('validate-user')
  validateUser(@Body() { username, password }: ValidateUserDto) {
    return this.nestGraphqlAuthService.validateUser(username, password);
  }

  // curl -X POST localhost:3000/sign-refresh-token -H 'Content-Type: application/json' | jq
  @Post('sign-refresh-token')
  signRefreshToken() {
    return this.nestGraphqlAuthService.signRefreshToken(adminCurrentUser, 0);
  }  
}
