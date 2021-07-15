# NOTES

## Update 2021-07-10 22:38:52

- last working on nestjs authentication package, to bring on to backend, but seems that we need `@CurrentUser` a La GraphQL, and in package it not exists, because we use req.user to get it
- backend authentication as errors in authorization endpoints, and maybe ob refresh tokens to
- frontend as the same code as `@SolidaryChain/solidarychain-development-frontend-playground`, only copied code to sp, to create the github repo and push

IMPORTANT: porject is not commited, this way we can view changes if we take it on future


add local package to package....
lerna add ./packages/nestjs-package-jwt-authentication-graphql --scope=@koakh/koakh-nestjs-graphql-starter
lerna add @nestjs/testing --scope=@koakh/koakh-nestjs-graphql-starter



UnhandledPromiseRejectionWarning: Error: Cannot determine a GraphQL output type for the "userLogin". Make sure your class is decorated with an appropriate decorator.
https://stackoverflow.com/questions/58780119/why-i-am-getting-cannot-determine-graphql-output-error
In my case, I was using the @ObjectType decorator, but I was importing from type-graphql. I imported from @nestjs/graphql instead, and the problem was resolved.
import { ObjectType } from '@nestjs/graphql';
replace all imports from { InputType, Field } from '@nestjs/graphql'; to '@nestjs/graphql'
removed from package.json "type-graphql": "^0.17.6",