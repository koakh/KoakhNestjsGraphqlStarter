import { Controller, Get } from '@nestjs/common';
import { NestGraphqlAuthService } from '../nest-graphql-auth.service';

@Controller()
export class NestGraphqlAuthClientController {
  constructor(private readonly nestGraphqlAuthService: NestGraphqlAuthService) {}

  @Get()
  index() {
    return this.nestGraphqlAuthService.test();
  }
}
