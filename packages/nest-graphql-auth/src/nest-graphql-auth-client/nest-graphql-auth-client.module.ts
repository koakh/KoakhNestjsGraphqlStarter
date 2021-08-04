/**
 *  NestGraphqlAuthClientModule is a testing module that verifies that
 *  NestGraphqlAuthModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestGraphqlAuthModule`.
 *
 *  Once you begin customizing NestGraphqlAuthModule, you'll probably want
 *  to delete this module.
 */
import { Global, Module } from '@nestjs/common';
import { NestGraphqlAuthModule } from '../nest-graphql-auth.module';
import { constants } from './constants';
import { NestGraphqlAuthClientController } from './nest-graphql-auth-client.controller';
import { UserService } from './nest-graphql-auth-user.service';

@Global()
@Module({
  providers: [
    // TODO the trick to inject usersService into NestGraphqlAuthModule is add UserService to providers and exports
    UserService, 
  ],
  exports: [
    // TODO the trick to inject usersService into NestGraphqlAuthModule is add UserService to providers and exports
    UserService, 
  ],
  imports: [
    NestGraphqlAuthModule.registerAsync({
      useFactory: async (userService: UserService) => ({
        // use configService here, or leave it static, better is keep this poc simple as can be
        secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a828',
        expiresIn: '120s',
        adminUserPayload: constants.adminCurrentUser,
        userService,
      }),
      inject: [UserService],
    }),
  ],
  controllers: [NestGraphqlAuthClientController],
})

export class NestGraphqlAuthClientModule { }
