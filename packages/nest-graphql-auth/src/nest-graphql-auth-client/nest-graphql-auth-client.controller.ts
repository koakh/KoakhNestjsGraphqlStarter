import { Body, Controller, Get, Post } from '@nestjs/common';
import { NestGraphqlAuthService } from '../nest-graphql-auth.service';
import { ValidateUserDto } from './dto';

@Controller()
export class NestGraphqlAuthClientController {
  constructor(private readonly nestGraphqlAuthService: NestGraphqlAuthService) {}

  @Get()
  index() {
    return this.nestGraphqlAuthService.test();
  }

  // curl -X POST localhost:3000/validate-user -d '{ "username" : "admin", "password": 12345678 }' -H 'Content-Type: application/json' | jq
  @Post('validate-user')
  validateUser(@Body() { username, password }: ValidateUserDto) {
    return this.nestGraphqlAuthService.validateUser(username, password );
  }
}
