# NOTES

## Links

- [Harnessing the power of TypeScript & GraphQL](https://docs.nestjs.com/graphql/quick-start)

## TLDR

- used node v10.12.0

## Installation


```shell
$ nest new NodeNestSGraphQLStarter
$ mv node-nest-sgraph-qlstarter NodeNestJsGraphQLStarter
$ cd NodeNestJsGraphQLStarter
# start by installing the required packages:
$ npm i \
  @nestjs/graphql @nest-middlewares/cookie-parser @nestjs/jwt @nestjs/passport \
  graphql type-graphql graphql-tools graphql-type-json graphql-subscriptions \
  class-transformer class-validator yup bcrypt \
  passport passport-jwt passport-local
```

## Problems

### (node:26491) UnhandledPromiseRejectionWarning: Error: Cannot determine a GraphQL output type for the "userLogin". Make sure your class is decorated with an appropriate decorator.


$ npm run build 

NodeNestJsGraphQLStarter/src/auth/auth.resolver.ts
import { LoginUserInput } from 'src/users/dto';


### GraphQLError: Query root type must be provided.

