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

$ npm i -D @types/passport-jwt @types/passport-local
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

## Debug Docker image problems

seems the problem is operations that use bcrypt

- [Help: Segmentation fault (core dumped) #708](https://github.com/kelektiv/node.bcrypt.js/issues/708)

- [bcrypt installation docker](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#docker)

> I think you are copying node_modules from the host into the docker. This occurs when there is a mismatch between libC runtimes. Alpine uses musl-libc and the host probably uses glibc.
Make sure you have node_modules in .dockerignore and perform an npm install inside the docker. Also, bcrypt in alpine-node will require a source compile. So you need python, make and gcc as well.

```shell
koakh-nestjs-graphql-starter    | [nodemon] app crashed - waiting for file changes before starting...
```

```shell
# enter container dev
$ docker exec -it koakh-nestjs-graphql-starter sh
$ NODE_DEBUG=myapp node dist/main.js
```

changed `"bcrypt": "^5.0.0"` to `"bcrypt": "3.0.3"`
