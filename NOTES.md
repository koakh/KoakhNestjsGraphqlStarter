# Notes

npx lerna add @koakh/nestjs-package-jwt-authentication-graphql/ --scope @koakh/koakh-nestjs-graphql-starter
npx lerna add npm-check --scope @koakh/koakh-nestjs-graphql-starter
npx lerna add npm-check-updates --scope @koakh/koakh-nestjs-graphql-starter


moved to auth, bellow files must be removed from user module, and user module must use types from auth module

- packages/nestjs-package-jwt-authentication-graphql/src/auth/object-types/user.model.ts

remove all non used packages 