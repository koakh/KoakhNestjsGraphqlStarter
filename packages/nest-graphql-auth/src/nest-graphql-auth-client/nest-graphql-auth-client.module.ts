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
 import { Module } from '@nestjs/common';
import { NestGraphqlAuthModule } from '../nest-graphql-auth.module';
import { constants } from './constants';
import { NestGraphqlAuthClientController } from './nest-graphql-auth-client.controller';
import { UserService } from './nest-graphql-auth-user.service';
 
 @Module({
   controllers: [NestGraphqlAuthClientController],
   imports: [
     NestGraphqlAuthModule.registerAsync({
       useFactory: () => {
         return {
           // TODO use configService here
           secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a828',
           expiresIn: '120s',
           adminUserPayload: constants.adminCurrentUser,
           userService: new UserService(),
         };
       },
     }),
   ],
 })
 
 export class NestGraphqlAuthClientModule { }
 