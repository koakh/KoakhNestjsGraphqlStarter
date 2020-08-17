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
  apollo-server-express graphql graphql-tools graphql-type-json graphql-subscriptions \
  passport passport-jwt passport-local \
  reflect-metadata class-transformer class-validator yup bcrypt uuid \
```

## Add to tsconfig.json

```json
{
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true,    
}
```

## Problems

### error TS5055: Cannot write file ... because it would overwrite input file.

- https://medium.com/@dk_90709/is-this-really-supported-71c810ae5825

```shell
$ npm run build
```

fix add `"noEmit": true` to `tsconfig.json`

### (node:26491) UnhandledPromiseRejectionWarning: Error: Cannot determine a GraphQL output type for the "userLogin". Make sure your class is decorated with an appropriate decorator.

(node:27360) UnhandledPromiseRejectionWarning: Error: Cannot determine a GraphQL input type for the "userLogin". Make sure your class is decorated with an appropriate decorator.

(node:27360) UnhandledPromiseRejectionWarning: Error: Cannot determine a GraphQL input type for the "loginUserData". Make sure your class is decorated with an appropriate decorator.

> the error is because we are using `ObjectType` from `type-graphql`, like in solidarycahin project, but in this version we must use `ObjectType` from `@nestjs/graphql`

ex: 

```typescript
// import { Field, ObjectType } from 'type-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
```

- [Migration Guid GraphQL](https://docs.nestjs.com/migration-guide#graphql)

1. simply rename all the `type-graphql` imports to the `@nestjs/graphql` 
2. use Type (imported from `@nestjs/common`) instead of `ClassType` (imported from `type-graphql`)
3. move methods that require `@Args()` from object types (classes annotated with `@ObjectType()` decorator) under resolver classes (and use `@ResolveField()` decorator instead of `@Field()`)

### Query root type must be provided.

```shell
$ npm run start:debug
Query root type must be provided.
```

> after add `receipes module`(*1), it start to works, seems that auth.resolver only have mutations and subscriptions and somehow we need a query, like shows in message `Query root`

(*1) from `23-graphql-code-first nest js samples`

we can confirm that we need a `Query` when we comment both Query resolvers `@Query(returns => Recipe)` and `@Query(returns => [Recipe])`, its start show same error `GraphQLError: Query root type must be provided.`

the root of the problem is that reflection can find any `Root Query` in injected modules, the reason is we only have `mutations` and `subscriptions` and don't have any `queries`
