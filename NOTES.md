# Notes

npx lerna add @koakh/nestjs-package-jwt-authentication-graphql --scope @koakh/koakh-nestjs-graphql-starter

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


curl localhost:3000 | jq
{
  "message": "Hello World from AppModule::AppService!"
}

curl -X POST localhost:3000/adduser -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 1
}

curl -X POST localhost:3000/increment -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 9
}

curl localhost:3000/config | jq
{
  "secret": "90dcfcd8-d3bd-4af0-a8a3-f3e03181a83f",
  "expiresIn": "120s"
}

curl localhost:3000/appmodule | jq
{
  "message": "Hello World from AppModule::AppService!"
}
