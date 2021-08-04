import { AuthModule, AuthService, GqlContext, GqlContextPayload, NEST_GRAPHQL_AUTH_USER_SERVICE } from '@koakh/nestjs-package-jwt-authentication-graphql';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { ConnectionParams } from 'subscriptions-transport-ws';
// import { AppResolver } from './app.resolver';
import { configuration } from './common/config';
import { mapKeysToLowerCase } from './common/utils';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { constants as userConstants } from './user/user.constants'

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
      imports: [AppModule, UserModule],
      inject: [ConfigService, UserService],
      useFactory: async (configService: ConfigService, userService: UserService) => ({
        secret: configService.get<string>('accessTokenJwtSecret'),
        expiresIn: configService.get<string>('accessTokenExpiresIn'),
        adminUserPayload: userConstants.adminCurrentUser,
        // the trick to pass userService without di complexity, just use options to pass around, don't forget to import UserModule to inject UserService
        userService,
      }),
    }),
    // AuthModule.registerAsync({
    //   useFactory: async (userService: UserService) => ({
    //     // use configService here, or leave it static, better is keep this poc simple as can be
    //     secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a828',
    //     expiresIn: '120s',
    //     adminUserPayload: userConstants.adminCurrentUser,
    //     userService,
    //   }),
    //   inject: [UserService],
    // }),
    // project/package modules
    UserModule,
    // apolloServer config: use forRootAsync to import AuthModule and inject AuthService
    GraphQLModule.forRootAsync({
      // inject: [ConfigService, AuthService],
      inject: [ConfigService],
      // import AuthModule
      // imports: [ConfigModule, AuthModule],
      imports: [ConfigModule],
      // inject authService
      // TODO
      // useFactory: async (configService: ConfigService, authService: AuthService) => ({
      useFactory: async (configService: ConfigService) => ({
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
              // TODO
              // // verify authToken/getJwtPayLoad
              // const jwtPayload: GqlContextPayload = authService.getJwtPayLoad(authToken);
              // // the user/jwtPayload object found will be available as context.currentUser/jwtPayload in your GraphQL resolvers
              // return { currentUser: jwtPayload.username, jwtPayload, headers: connectionParamsLowerKeys };
            }
            throw new AuthenticationError('authToken must be provided');
          },
        },
      }),
    }),
  ],
  providers: [
    // TODO remove stub AppResolver
    // AppResolver,
    // another trick is that this AppService is required to else we have the mitica error
    // Nest can't resolve dependencies of the AppController (?, AuthService). Please make sure that the argument AppService at index [0] is available in the AppModule context.
    UserService,
    // {
    //   provide: NEST_GRAPHQL_AUTH_USER_SERVICE,
    //   useClass: UserService,
    //   // useValue: 'VALUE_FROM_NEST_GRAPHQL_AUTH_USER_SERVICE'
    // }
  ],
  // at last so kind of clue, this is waht will solve the problem of 
  // ERROR [ExceptionHandler] Nest can't resolve dependencies of the AuthService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument NEST_GRAPHQL_AUTH_USER_SERVICE at index [1] is available in the AuthModule context.
  // now we can import it with `imports: [AppModule]` into AuthModule, and expose it's providers
  // this wat we use it inside it with `@Inject('NEST_GRAPHQL_AUTH_USER_SERVICE')`
  exports: [
    UserService,
    // {
    //   // TODO
    //   // global: true, 
    //   provide: NEST_GRAPHQL_AUTH_USER_SERVICE,
    //   useClass: UserService,
    //   // always test with a value first
    //   // useValue: 'VALUE_FROM_NEST_GRAPHQL_AUTH_USER_SERVICE'
    // }
  ]
})

export class AppModule { }
