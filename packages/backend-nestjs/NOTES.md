# NOTES : Warning : Internal notes, subject to errors and typos

- [NOTES : Warning : Internal notes, subject to errors and typos](#notes--warning--internal-notes-subject-to-errors-and-typos)
  - [Start](#start)
  - [GraphQL project use server-rest auth and users module](#graphql-project-use-server-rest-auth-and-users-module)
  - [Links](#links)
  - [TypeGraphQL Notes](#typegraphql-notes)
  - [JSON Scalar Type](#json-scalar-type)
  - [Date Scalars](#date-scalars)
  - [Add all Other Query/Mutations](#add-all-other-querymutations)
  - [How to use content attribute](#how-to-use-content-attribute)
  - [Problem with RichQueries with Object](#problem-with-richqueries-with-object)
  - [Authentication Notes](#authentication-notes)
  - [Problem: Nest can't resolve dependencies of the GqlLocalAuthGuard](#problem-nest-cant-resolve-dependencies-of-the-gqllocalauthguard)
  - [Awesome Link: Support AuthGuard](#awesome-link-support-authguard)
  - [Problem with `return super.canActivate(new ExecutionContextHost([req]))`](#problem-with-return-supercanactivatenew-executioncontexthostreq)
  - [@CurrentUser() decorator, to get @CurrentUser() in graphql endpoints like in personProfile](#currentuser-decorator-to-get-currentuser-in-graphql-endpoints-like-in-personprofile)
  - [GraphQL Playground: ERR_INSECURE_RESPONSE](#graphql-playground-err_insecure_response)
  - [GraphQL Playground: Server cannot be reached](#graphql-playground-server-cannot-be-reached)
  - [Getting headers in GraphQL](#getting-headers-in-graphql)
  - [Cookie Parser](#cookie-parser)
  - [Apollo-Link-Token-Refresh and Migrate `apollo-boost` to `apollo-client`](#apollo-link-token-refresh-and-migrate-apollo-boost-to-apollo-client)
  - [How to use AuthGuard/Authentication with Apollo Subscriptions](#how-to-use-authguardauthentication-with-apollo-subscriptions)
    - [Links used](#links-used)
    - [1. Add connection to GqlContext](#1-add-connection-to-gqlcontext)
    - [2. change AppModule with subscriptions and forRootAsync](#2-change-appmodule-with-subscriptions-and-forrootasync)
    - [3. Change GqlAuthGuard to return subscription connection.context.headers to passport-jwt service](#3-change-gqlauthguard-to-return-subscription-connectioncontextheaders-to-passport-jwt-service)
    - [4. How to used filtered subscriptions with currentUser or UserRoles.ROLE_ADMIN](#4-how-to-used-filtered-subscriptions-with-currentuser-or-userrolesrole_admin)
  - [YUP Validation notes](#yup-validation-notes)
  - [Currency codes iso4217](#currency-codes-iso4217)
  - [Add new module to nestjs graphql](#add-new-module-to-nestjs-graphql)
  - [Manage Chaincode to GraphQL Error messages](#manage-chaincode-to-graphql-error-messages)
  - [TS5055: Cannot write file](#ts5055-cannot-write-file)
  - [A circular dependency has been detected](#a-circular-dependency-has-been-detected)
  - [re-install all packages dependencies in case of "cannot find module 'typescript/bin/tsc'"](#re-install-all-packages-dependencies-in-case-of-cannot-find-module-typescriptbintsc)
  - [TypeError: httpAdapter.getType is not a function](#typeerror-httpadaptergettype-is-not-a-function)
  - [Cannot determine GraphQL input type](#cannot-determine-graphql-input-type)
    - [Input types](#input-types)
  - [Error: Cannot return null for non-nullable field Subscription.reactForceDataAdded.](#error-cannot-return-null-for-non-nullable-field-subscriptionreactforcedataadded)
  - [Problem: Error: 14 UNAVAILABLE: failed to connect to all addresses](#problem-error-14-unavailable-failed-to-connect-to-all-addresses)

## Start

DONt forget to build common package `@solidary-chain/common-cc`, if something change, but first restart server

```shell
# build common library: this is required on fresh clones before lerna bootstrap else `Cannot find module '@solidary-chain/common-cc'`
$ npx lerna run build --scope @solidary-chain/common-cc --stream
```

```shell
# start debug (inside vscode)
$ npx lerna run start:debug --scope @solidary-chain/server-graphql --stream
# start dev
$ npx lerna run start:dev --scope @solidary-chain/server-graphql --stream
```

- [GraphQL Playground](http://localhost:3000/graphql)

```shell
# generate graphql types for frontend
$ npx lerna run gen:graphql --scope @solidary-chain/frontend-react
```

```shell
# add dependencies
$ npx lerna add participant-cc --scope @solidary-chain/server-graphql
$ npx lerna add person-cc --scope @solidary-chain/server-graphql
$ npx lerna add common --scope @solidary-chain/server-graphql
```

```shell
# in case of errors like Cannot find module '@solidary-chain/common-cc'.
$ npx lerna clean
$ npx lerna bootstrap
```

## GraphQL project use server-rest auth and users module

required to create symbolic links, else we have a lots of problems with dist and builds if we try to back dirs

```shell
# sym link auth and user modules
$ cd packages/server-graphql/src
$ ln -s ../../server-rest/src/auth/
$ ln -s ../../server-rest/src/users/
```

## Links

- [Convector Slackbiz](https://stackblitz.com/edit/convector)
- [Use ObjectType and InputType decorators together](https://github.com/MichalLytek/type-graphql/issues/62)

## TypeGraphQL Notes

all input types required to have names `@Args('getByAttributeInput') argument`, else it crash with strange errors ex

```typescript
@Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput
```

## JSON Scalar Type

- [Custom scalars and enums - Apollo Docs](https://www.apollographql.com/docs/graphql-tools/scalars/)

```shell
# install graphql-type-json
$ npx lerna add graphql-type-json --scope @solidary-chain/server-graphql
```

to use `any` in graphql we must implement a custom scalar type or use the [graphql-type-json](https://github.com/taion/graphql-type-json) package

- [Dynamic (Unique) Objects in GraphQl](https://stackoverflow.com/questions/33819658/dynamic-unique-objects-in-graphql)

```typescript
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Attribute {
  @Field(type => GraphQLJSONObject)
  public content: any;
```

```
"message": "JSONObject cannot represent non-object value: 1993"
```

here we must convert "1993" into object ex `{ data: '1993' }` check function `convertAttributes`

after, test with more than on attribute with

```shell
# add some attributes
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "graduated-year", "certifierID": "gov", "content": "1999", "issuedDate": 1554239270 }' -u admin
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "marriage-year", "certifierID": "gov", "content": "2012", "issuedDate": 1554239270 }' -u admin
```

## Date Scalars

- [Date Scalars](https://typegraphql.ml/docs/scalars.html#date-scalars)

use date with convector models [post](Convector: what is the best way to store Date type in convector models?)
the trick is using epoch time in convector models and a Date scalar to convert from epoch to date and vs
check `packages/server-graphql/src/common/scalars/date.scalar.ts`

## Add all Other Query/Mutations

## How to use content attribute

- [How to use Convector to querie CouchDB Rich Queries with JSON Objects?](https://stackoverflow.com/questions/57838092/how-to-use-convector-to-querie-couchdb-rich-queries-with-json-objects)

`packages/person-cc/src/person.model.ts`

```typescript
// Diego: I see, all properties need a @Validate() decorator else convector will ignore it
// Required to use nullable(), else content must be a `object` type, but the final value was: `null`
@Required()
@Validate(yup.object().nullable())
public content: any;
```

without `.nullable()` we get

```
500,"message":"Error for field 'attributes' with val '[{\"certifierID\":\"gov\",\"content\":\"1993\",\"id\":\"birth-year\",\"phase2\":\"2013\",\"phase3\":\"2013\"},\"id\":\"reborn5-year\",\"issuedDate\":1554239270,
\"type\":\"com.chain.solidary.model.attribute\"}]' [0].content must be a `object` type, but the final value was: `null` (cast from the value `\"1993\"`).\n If \"null\" is intended as an empty value be sure to mark the schema as `.nullable()`"}]. Sending ERROR message back to peer  
```

## Problem with RichQueries with Object

```typescript
return await Person.query(Person, {
  selector: {
    type: c.CONVECTOR_MODEL_PATH_PERSON,
    attributes: {
      $elemMatch: {
        id: id,
        content: value
      }
    }
  }
});
```

in docker logs we can view that value is content is sent has a string and not a object ex `"content":"{\"data\":\"1971\"}"`

```json
{"selector":{"type":"com.chain.solidary.model.person","attributes":{"$elemMatch":{"id":"born-year","content":"{\"data\":\"1971\"}"}}}}
```

> read the SO post, link on top of notes

## Authentication Notes

```shell
# install the required packages
$ npx lerna add @nestjs/passport --scope @solidary-chain/server-graphql --no-bootstrap
$ npx lerna add @nestjs/jwt --scope @solidary-chain/server-graphql --no-bootstrap
$ npx lerna add passport --scope @solidary-chain/server-graphql --no-bootstrap
$ npx lerna add passport-local --scope @solidary-chain/server-graphql --no-bootstrap
$ npx lerna add bcrypt --scope @solidary-chain/server-graphql --no-bootstrap
# dev
$ npx lerna add @types/passport-local --scope @solidary-chain/server-graphql --dev --no-bootstrap
$ npx lerna add @types/passport-jwt --save-dev --scope @solidary-chain/server-graphql --dev --no-bootstrap
# bootstrap
$ npx lerna bootstrap
```

```shell
# create modules and services
$ nest g module auth
$ nest g service auth
$ nest g module users
$ nest g service users
```

## Problem: Nest can't resolve dependencies of the GqlLocalAuthGuard

```
@solidary-chain/server-graphql: [Nest] 14138   - 2019-09-15 21:21:30   [ExceptionHandler] Nest can't resolve dependencies of the GqlLocalAuthGuard (?). Please make sure that the argument at index [0] is available in the PersonModule context. +4ms

@solidary-chain/server-graphql: [Nest] 15907   - 2019-09-15 21:25:25   [ExceptionHandler] Nest can't resolve dependencies of the GqlLocalAuthGuard (?). Please make sure that the argument at index [0] is available in the GqlLocalAuthGuard context. +234ms

@solidary-chain/server-graphql: [Nest] 6421   - 2019-09-15 22:22:27   [ExceptionHandler] Nest can't resolve dependencies of the PersonService (?). Please make sure that the argument at index [0] is available in the PersonModule context. +69ms
```

this occurs because **we are imports services**, **never imports services**, **when we import module we already have access to all exported providers(services etc) from module**

> the trick to use `GqlLocalAuthGuard` in `PersonModule` is just import `AuthModule` in `PersonModule`

ex

```typescript
@Module({
  imports: [AuthModule],
  providers: [PersonResolver, PersonService, DateScalar],
})

export class PersonModule { }
```

## Awesome Link: Support AuthGuard

- [Support AuthGuard : GraphQL](https://github.com/nestjs/graphql/issues/48)

1. passing req to graphql context
2. auth guard GraphqlAuthGuard
3. user decorator
4. using user decorator in mutation

ideal for `personProfile.graphql`

used in `src/auth/gql-auth.guard.ts`

## Problem with `return super.canActivate(new ExecutionContextHost([req]))`

```
error TS2345: Argument of type 'ExecutionContextHost' is not assignable to parameter of type 'ExecutionContext'. Property 'getType' is missing in type 'ExecutionContextHost' but required in type 'ExecutionContext'.
```

- [NestJS Get current user in GraphQL resolver authenticated with JWT](https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt)

> Instead of implement your own `canActivate` method in your `GqlAuthGuard` you should create a `getRequest` method and return `GqlExecutionContext.create(context).getContext().req;`. This is a better approach in my opinion.

the fix is just use `getRequest()`  from nest docs (maybe this is new, after I implemented above canActivate method)

- [Nest graphql](https://docs.nestjs.com/techniques/authentication#graphql)

> In order to use an AuthGuard with GraphQL, extend the built-in AuthGuard class and override the getRequest() method.

remove old `canActivate` method and add official docs `getRequest` method and it works :)

old method

```typescript
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  // GqlExecutionContext exposes corresponding methods for each argument, like getArgs(), getContext()
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  // the req parameter will contain a user property
  // (populated by Passport during the passport-local authentication flow)
// const authorization: string = (req.headers.authorization)
//   ? req.headers.authorization
//   : null;
// if (authorization) {
    // const token: string = authorization.toLowerCase().replace('bearer ', '');
    // const validToken = this.jwtService.verify(token);
  return super.canActivate(new ExecutionContextHost([req]));
// } else {
//   return false;
// }
}
```

new method

```typescript
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
```

## @CurrentUser() decorator, to get @CurrentUser() in graphql endpoints like in personProfile

`packages/server-graphql/src/common/decorators/user.decorator.ts`

```typescript
@Query(returns => Person)
async personProfile(@CurrentUser() user: Person): Promise<Person> {
  return await this.personService.findOneByUsername(user.username);
}
```

## GraphQL Playground: ERR_INSECURE_RESPONSE

using `https://localhost:3443/graphql` ERR_INSECURE_RESPONSE, fix using browser version and accept certificate

## GraphQL Playground: Server cannot be reached

and requests result with:

```json
{
  "error": "Failed to fetch schema. Please check your connection"
}
```

this is related with self signed certificate, to override this launch graphql playground with `--ignore-certificate-errors` flag ex `/opt/@AppImage/graphql-playground-electron-1.8.5-x86_64.AppImage --ignore-certificate-errors`

to persiste flag in `.desktop` app 

```shell
$ nano ~/.local/share/applications/appimagekit-graphql-playground-electron.desktop

[Desktop Entry]
Name=GraphQL Playground
Comment=GraphQL IDE for better development workflows (GraphQL Subscriptions, interactive docs & collaboration)
Exec="/opt/@AppImage/graphql-playground-electron-1.8.5-x86_64.AppImage" %U --ignore-certificate-errors
...
```

## Getting headers in GraphQL

fix "Cannot read property 'headers' of undefined" graphql request

- [NestJS Execution context](https://docs.nestjs.com/graphql/tooling#execution-context)

- [Applying Middleware-like mechanism to Resolvers' Queries and Mutations](https://stackoverflow.com/questions/54532263/applying-middleware-like-mechanism-to-resolvers-queries-and-mutations)

- [Authentication: GraphQL Official Docs](https://docs.nestjs.com/techniques/authentication#graphql)

GraphQL Playground accepts cookie must change preferences `"request.credentials": "omit"` to `"request.credentials": "include"`

## Cookie Parser

- [Cookie Parser](https://www.npmjs.com/package/@nest-middlewares/cookie-parser)

- [NestJs Middleware](https://docs.nestjs.com/middleware)

```shell
$ curl -k --request POST \
  --url https://localhost:3443/refresh-token \
  --cookie jid=j%253A%257B%2522accessToken%2522%253A%2522eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmVkb2UiLCJpYXQiOjE1NjkyNzc0NjAsImV4cCI6MTU2OTg4MjI2MH0.A6XcwTvNZDUoT1MG6lFu7GyxVDg1GrTyTkjEFhvgDtI%2522%257D
```

```shell
# add cookie parser
$ npx lerna add @nest-middlewares/cookie-parser --scope @solidary-chain/server-graphql
```

```typescript
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('/refresh-token');
  }
}
```

notes with `tokenVersion` we must:

1. login, and get cookie refreshToken
2. send refreshToken to /refresh-token, keep send this same refreshToken until we login, time when we increase tokenVersion and it will be invalidated

> never use `accessToken`, wrong secret, don't have `tokenVersion`

```shell
# refreshToken from cookie
$ TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmVkb2UiLCJ0b2tlblZlcnNpb24iOjUsImlhdCI6MTU2OTM2Mzg1MCwiZXhwIjoxNTY5OTY4NjUwfQ.ArD1yOMv_xrsUwveKur9Jyy03FKhvdvYZQaoY54KfGw
$ curl -k -v -X POST \
  --url https://localhost:3443/refresh-token \
  --cookie jid=${TOKEN}
```

## Apollo-Link-Token-Refresh and Migrate `apollo-boost` to `apollo-client`

- [apollo-link-token-refresh](https://github.com/newsiberian/apollo-link-token-refresh)
- [Apollo Boost migration](https://www.apollographql.com/docs/react/migrating/boost-migration/)

```shell
# install deps
$ npx lerna add apollo-link-token-refresh --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add jwt-decode --scope @solidary-chain/frontend-react --no-bootstrap
# types
$ npx lerna add @types/jwt-decode --scope @solidary-chain/frontend-react --dev --no-bootstrap
# bootstrap
$ npx lerna bootstrap
```

## How to use AuthGuard/Authentication with Apollo Subscriptions

### Links used

- [Authentication Over WebSocket](https://www.apollographql.com/docs/apollo-server/data/subscriptions/#authentication-over-websocket)
- [Authorization middleware do not work with @Subscription()](https://github.com/nestjs/graphql/issues/82)
- [nestjs/graphql:Support AuthGuard](https://github.com/nestjs/graphql/issues/48)
- [A WebSocket client + server for GraphQL subscriptions](https://github.com/apollographql/subscriptions-transport-ws)

- [Document how authentication guards for GraphQL Subscriptions work](https://github.com/nestjs/docs.nestjs.com/issues/394)

> posted my solution to above link

this seems tricky but it is currently working with headers, consistent with queries and mutations

![insomnia](assets/images/200.png)

### 1. Add connection to GqlContext

`gql-context.ts`

```typescript
export interface GqlContext {
  req: Request;
  res: Response;
  payload?: GqlContextPayload;
  // required for subscription
  connection: any;
}
```

### 2. change AppModule with subscriptions and forRootAsync

here we must inject AuthModule/AuthService to check Authorization headers JWT, for this we must replace `GraphQLModule.forRoot` with `GraphQLModule.forRootAsync` and import AuthModule with `imports: [AuthModule]`, and inject service with `inject: [AuthService]`

`app.module.ts`

```typescript
@Module({
  imports: [
    AuthModule,
    UsersModule,
    // chaincode modules
    ParticipantModule,
    PersonModule,
    CauseModule,
    TransactionModule,
    // apolloServer config: use forRootAsync to import AuthModule and inject AuthService
    GraphQLModule.forRootAsync({
      // import AuthModule
      imports: [AuthModule],
      // inject authService
      useFactory: async (authService: AuthService) => ({
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        // pass the original req and res object into the graphql context,
        // get context with decorator `@Context() { req, res, payload, connection }: GqlContext`
        // req, res used in http/query&mutations, connection used in webSockets/subscriptions
        context: ({ req, res, payload, connection }: GqlContext) => ({ req, res, payload, connection }),
        // configure graphql cors here
        cors: {
          origin: e.corsOriginReactFrontend,
          credentials: true,
        },
        // subscriptions/webSockets authentication
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
      // inject: AuthService
      inject: [AuthService],
    }),
    // Old code without GraphQLModule.forRootAsync used to inject AuthService from AuthModule to get subscription authentication work
    // GraphQLModule.forRoot({
    //   debug: true,
    //   playground: true,
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql',
    //   // pass the original req and res object into the graphql context,
    //   // get context with decorator `@Context() { req, res, payload }: GqlContext`
    //   context: ({ req, res, payload }: GqlContext) => ({ req, res, payload }),
    //   // configure graphql cors here
    //   cors: {
    //     origin: e.corsOriginReactFrontend,
    //     credentials: true,
    //   },
    // }),
  ],
})
```

### 3. Change GqlAuthGuard to return subscription connection.context.headers to passport-jwt service

`gql-auth.guard.ts`

```typescript
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // req used in http queries and mutations, connection is used in websocket subscription connections, check AppModule
    const { req, connection } = ctx.getContext();

    // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
    return (connection && connection.context && connection.context.headers)
      ? connection.context
      : req;
  }
}
```

done

### 4. How to used filtered subscriptions with currentUser or UserRoles.ROLE_ADMIN

2021-02-07 18:43:59

- [Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)
- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/graphql/subscriptions)
- [Subscription filter not working · Issue #164 · nestjs/graphql](https://github.com/nestjs/graphql/issues/164)

the first implement is in `asset.resolver.ts`, **the trick to get user in filter is get context**,
with this the subscription only be published to the user that created it

```typescript
@Roles(UserRoles.ROLE_USER)
@UseGuards(GqlRolesGuard)
@Subscription(returns => Asset, {
  filter: (payload, variables: any, ctx: any) => {
    Logger.log(`payload: [${payload[SubscriptionEvent.assetAdded].createdByPersonId}]`);
    Logger.log(`variables: [${JSON.stringify(ctx.connection.context.user, undefined, 2)}]`);
    return payload[SubscriptionEvent.assetAdded].createdByPersonId === ctx.connection.context.user.userId
      || hasRole(ctx.connection.context.user.roles, UserRoles.ROLE_ADMIN);
  }
})
assetAdded(
  @CurrentUser() user: CurrentUserPayload,
) {
  return pubSub.asyncIterator(SubscriptionEvent.assetAdded);
}
```

## YUP Validation notes

- [How Does yup.addMethod() Work? Creating Custom Validation Functions With Yup](https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470)

## Currency codes iso4217

- [Very simple lib to check if something is a iso 4217 currency code](https://github.com Boelensman1/validate-currency-code)

## Add new module to nestjs graphql

1. create dir `packages/server-graphql/src/cause`
2. create`packages/server-graphql/src/cause/cause.module.ts`, `packages/server-graphql/src/cause.service.ts`, `packages/server-graphql/src/cause/cause.resolver.ts`
3. create dirs `src/cause/dto` and `src/cause/models` and populate with files
4. add module to `packages/server-graphql/src/app.module.ts`

## Manage Chaincode to GraphQL Error messages

- [Exception filters](https://docs.nestjs.com/exception-filters)

ex `packages/server-graphql/src/person/person.service.ts`

```typescript
async create(data: NewPersonInput): Promise<Person> {
  try {
    ....
  } catch (error) {
    // extract error message
    const errorMessage: string = (error.responses && error.responses[1].error.message) ? error.responses[1].error.message : error;
    // override default 'throw errorMessage;' with a customized version
    throw new HttpException({errorMessage, HttpStatus.CONFLICT}, HttpStatus.CONFLICT);
  }
}
```

we get customized error from chaincode

```json
{
  "errors": [
    {
      "message": {
        "status": 409,
        "error": "There is a person registered with that username already (johndoe)"
      },
    ...
```

## TS5055: Cannot write file

```shell
@solidary-chain/server-graphql: 20:16:08 - File change detected. Starting incremental compilation...
@solidary-chain/server-graphql: error TS5055: Cannot write file '/media/mario/Storage/Development/@SolidaryChain/network/packages/server-graphql/dist_/common/dto/get-by-complex-query.input.d.ts' because it would overwrite input file.
```

find by `'dist/` some file is import a `dist` file ex `packages/server-graphql/src/person/person.service.ts`

```typescript
import GetByComplexQueryInput from 'dist_/common/dto/get-by-complex-query.input';
```

## A circular dependency has been detected

A circular dependency has been detected. Please, make sure that each side of a bidirectional relationships are decorated with "forwardRef()

- [Application crash when using barrel files (multi index.ts)](https://github.com/nestjs/nest/issues/1181#issuecomment-430197191)

- [Application crash when using barrel files (multi index.ts) #1181](https://github.com/nestjs/nest/issues/1181)

- [Circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency)

remove all recent created barrel files that is the cause of the issue

- packages/server-graphql/src/cause/index.ts
- packages/server-graphql/src/auth/index.ts
- packages/server-graphql/src/participant/index.ts
- packages/server-graphql/src/cause/index.ts
- packages/server-graphql/src/auth/index.ts
- packages/server-graphql/src/participant/index.ts
- packages/server-graphql/src/users/index.ts

now fix dependencies is `packages/server-graphql/src/app.module.ts`

done it works has expected, thumb rule NEVER use barrel files in modules root, NEVER means NEVER!

## re-install all packages dependencies in case of "cannot find module 'typescript/bin/tsc'"

```shell
# $ npx lerna bootstrap
$ npm i
```

## TypeError: httpAdapter.getType is not a function

```shell
$ npm run pkg:graphql:debug
nest.js : TypeError: httpAdapter.getType is not a function
npx lerna bootstrap --scope @solidary-chain/server-graphql
```

- [Update your @nestjs/platform-express to the latest version](https://github.com/nestjs/swagger/issues/434)

```json
// change
"@nest-middlewares/cookie-parser": "^6.0.0",
"@nestjs/common": "^6.5.3",
"@nestjs/core": "6.5.3",
"@nestjs/graphql": "^6.5.1",
"@nestjs/jwt": "^6.1.1",
"@nestjs/passport": "^6.1.0",
"@nestjs/platform-express": "6.5.3",
// to
"@nest-middlewares/cookie-parser": "^6.0.0",
"@nestjs/common": "6.11.8",
"@nestjs/core": "6.11.8",
"@nestjs/graphql": "6.6.1",
"@nestjs/jwt": "6.1.2",
"@nestjs/passport": "6.2.0",
"@nestjs/platform-express": "6.11.8",
```

## Cannot determine GraphQL input type

- [Cannot determine GraphQL input type ](https://github.com/MichalLytek/type-graphql/issues/371)

This may have been due to using an `@ObjectType()` CompanyData as an `@InputType()` in the resolver.

See docs for: [inputType](https://github.com/MichalLytek/type-graphql/blob/master/docs/resolvers.md#input-types)

### Input types

GraphQL mutations can be similarly created: Declare the class method, use the @Mutation decorator, create arguments, provide a return type (if needed) etc. But for mutations **we usually use input types**, hence TypeGraphQL allows us to **create inputs** in the **same way as object types** but by using the `@InputType()` decorator

ex

```typescript
@InputType({ description: "New recipe data" })
class AddRecipeInput implements Partial<Recipe> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
```

## Error: Cannot return null for non-nullable field Subscription.reactForceDataAdded.

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Subscription.foobar.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "foobar"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: Cannot return null for non-nullable field Subscription.foobar.",
            "    at completeValue (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:560:13)",
            "    at completeValueCatchingError (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:495:19)",
            "    at resolveField (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:435:10)",
            "    at executeFields (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:275:18)",
            "    at executeOperation (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:219:122)",
            "    at executeImpl (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:104:14)",
            "    at execute (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/execution/execute.js:64:63)",
            "    at mapSourceToResponse (/media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/subscription/subscribe.js:75:33)",
            "    at /media/mario/storage/Home/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/graphql/subscription/mapAsyncIterator.js:76:20",
            "    at new Promise (<anonymous>)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

fuck seems that `reactForceData` must match in publish and subscriptions name, 2h in this stuff, I started with this but how cares move on

```typescript
...
  pubSub.publish(SubscriptionEvent.reactForceData, { [SubscriptionEvent.reactForceData]: cause });
}
@UseGuards(GqlAuthGuard)
@Subscription(returns => Cause)
reactForceData() {
  return pubSub.asyncIterator(SubscriptionEvent.reactForceData);
}
```

Update: seems that when I started I used `reactForceDataAdded` and not `reactForceData` in this is the main reason for epic faillure

## Problem: Error: 14 UNAVAILABLE: failed to connect to all addresses

everything, but in one restart server, without change anything start appear

```shell
$ npm run pkg:graphql:debug:network
Context path with cryptographic materials exists +4ms
@solidary-chain/server-graphql: 2021-02-07T16:57:49.762Z - error: [Channel.js]: Error: 14 UNAVAILABLE: failed to connect to all addresses
```

when try a `sanity-check.sh`, seems that was a connection problem

```shell
$ cd ~/Development/@SolidaryChain/solidarychain-production-network/fabric-samples/5node2channel/
$ ./sanity-check.sh
check md5sum
ssh: connect to host 192.168.1.61 port 22: No route to host
```
