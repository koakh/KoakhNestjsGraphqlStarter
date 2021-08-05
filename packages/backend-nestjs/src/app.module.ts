import { AuthController, AuthModule, AuthService, GqlContext, GqlContextPayload } from '@koakh/nestjs-package-jwt-authentication-graphql';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { configuration } from './common/config';
import { mapKeysToLowerCase } from './common/utils';
import { constants as userConstants } from './user/user.constants';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

// REQUIRED global else gives bellow error
// Nest can't resolve dependencies of the Symbol(NEST_GRAPHQL_AUTH_OPTIONS) (?). Please make sure that the argument UserService at index [0] is available in the AuthModule context.
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: true,
      load: [configuration],
      // TODO
      // validate,
    }),
    AuthModule.registerAsync({
      // this is required to else we have error
      // ERROR [ExceptionHandler] Nest can't resolve dependencies of the AuthService (ConfigService, JwtService, AUTH_MODULE_OPTIONS, ?). Please make sure that the argument NEST_GRAPHQL_AUTH_USER_SERVICE at index [3] is available in the AuthModule context.
      imports: [AppModule, UserModule/*, JwtModule*/],
      // required to inject both bellow services
      inject: [ConfigService, UserService/*, JwtService*/],
      useFactory: async (configService: ConfigService, userService: UserService) => ({
        secret: configService.get<string>('accessTokenJwtSecret'),
        refreshTokenJwtSecret: configService.get<string>('refreshTokenJwtSecret'),
        expiresIn: configService.get<string>('accessTokenExpiresIn'),
        adminUserPayload: userConstants.adminCurrentUser,
        // the trick to pass userService without di complexity, just use options to pass around, don't forget to import UserModule to inject UserService
        userService,
      }),
    }),
    // project/package modules
    UserModule,
    // apolloServer config: use forRootAsync to import AuthModule and inject AuthService
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      // TODO trick for injecting custom providers is use NEST_GRAPHQL_AUTH_OPTIONS
      inject: [ConfigService, AuthService],
      useFactory: async (configService: ConfigService, authService: AuthService) => ({
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        // pass the original req and res object into the graphql context,
        // get context with decorator `@Context() { req, res, payload, connection }: GqlContext`
        // req, res used in http/query&mutations, connection used in webSockets/subscriptions
        context: ({ req, res, payload, connection }: GqlContext) => ({ req, res, payload, connection }),
        // configure graphql cors here, rest cors is configured in packages/server-graphql/src/main.ts
        cors: {
          origin: configService.get<string>('server.corsOriginReactFrontend'),
          credentials: true,
        },
        // subscriptions/webSockets authentication
        // read NOTES.md: How to use AuthGuard/Authentication with Apollo Subscriptions
        subscriptions: {
          // get headers
          onConnect: (connectionParams: ConnectionParams) => {
            // convert header keys to lowercase
            const connectionParamsLowerKeys = mapKeysToLowerCase(connectionParams);
            // get authToken from authorization header
            const authToken: string = ('authorization' in connectionParamsLowerKeys)
              && connectionParamsLowerKeys.authorization.split(' ')[1];
            if (authToken) {
              // verify authToken/getJwtPayLoad
              const jwtPayload: GqlContextPayload = authService.getJwtPayLoad(authToken);
              // the user/jwtPayload object found will be available as context.currentUser/jwtPayload in your GraphQL resolvers
              return { currentUser: jwtPayload.username, jwtPayload, headers: connectionParamsLowerKeys };
            }
            throw new AuthenticationError('authToken must be provided');
          },
        },
      }),
    }),
  ],
  providers: [
    // JwtModule,
    // JwtService,
    UserService,
  ],
  exports: [
    UserService,
  ],
  // controllers: [
  //   AuthController
  // ],
})

export class AppModule { }
