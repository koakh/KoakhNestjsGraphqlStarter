# Notes

npx lerna add @koakh/nestjs-package-jwt-authentication-graphql --scope @koakh/koakh-nestjs-graphql-starter

npx lerna add @golevelup/nestjs-modules --scope @koakh/nestjs-package-jwt-authentication-graphql 

npx lerna add @nestjs/jwt --scope @koakh/koakh-nestjs-graphql-starter


npx lerna add npm-check --scope @koakh/koakh-nestjs-graphql-starter
npx lerna add npm-check-updates --scope @koakh/koakh-nestjs-graphql-starter


moved to auth, bellow files must be removed from user module, and user module must use types from auth module

- packages/nestjs-package-jwt-authentication-graphql/src/auth/object-types/user.model.ts

remove all non used packages 

to build docker image must remove symbolic link in
node_modules/@koakh/nestjs-package-jwt-authentication-graphql -> ../../../nestjs-package-jwt-authentication-graphql
rm node_modules/@koakh/nestjs-package-jwt-authentication-graphql

Remove package from package.json
Remove node_modules folder: rm -rf packages/{package_name}/node_modules
Run lerna bootstrap

    "@koakh/nestjs-package-jwt-authentication-graphql": "^1.0.0",




/media/mario/storage/Home/Documents/Development/Node/@SimpleProjectsAndStarters/TypeScript/TypeScriptNodeNestJsGraphQLStarter/@koakh/nestjs-package-jwt-authentication-graphql/package.json
/home/mario/Development/Node/@SimpleProjectsAndStarters/TypeScript/TypeScriptNodeNestJsGraphQLStarter/packages/nestjs-package-jwt-authentication-graphql/package.json


