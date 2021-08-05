# NOTES

project started with `nestjsplus/dyn-schematics` and have a consumer app `packages/nestjs-package-jwt-authentication-graphql/src/nest-graphql-auth-client`, to test it

```shell
# term 1
$ cd packages/nestjs-package-jwt-authentication-graphql/
# launch tsc-watch in package and --onSuccess nestjs-package-jwt-authentication-graphql-client
```

don't forget to enable soureMaps on packages/`nestjs-package-jwt-authentication-graphql/tsconfig.json`

## Launch some Queries

see `packages/nestjs-package-jwt-authentication-graphql/src/nestjs-package-jwt-authentication-graphql-client/nestjs-package-jwt-authentication-graphql-client.controller.ts` or

```shell
# bellow request uses this.userService.findOneByField

# don't use 12345678 else `bcrypt compareSync “Unhandled rejection Error: data and hash must be strings”`
# https://stackoverflow.com/questions/44063440/bcrypt-comparesync-unhandled-rejection-error-data-and-hash-must-be-strings
$ curl -X POST localhost:3000/validate-user -d '{ "username" : "admin", "password": "12345678" }' -H 'Content-Type: application/json' | jq

# use `signRefreshToken(adminCurrentUser, 0)`
$ curl -X POST localhost:3000/sign-refresh-token -H 'Content-Type: application/json' | jq
```

## Other Notes

```shell
$ npm i bcrypt @nestjs/jwt @nestjs/graphql @nestjs/passport graphql graphql-subscriptions graphql-type-json passport passport-jwt passport-local uuid yup @nest-middlewares/cookie-parser
```

- [How to import a registerAsync in a dynamic Nestjs module?](https://stackoverflow.com/questions/63356440/how-to-import-a-registerasync-in-a-dynamic-nestjs-module)

TypeError: Cannot read property 'provide' of undefined at Module.isCustomProvider _tickCallback (internal/process/next_tick.js:68:7) at Function.Module. The work-around is to import Nest JS Modules directly, and not via Index files. I don't fully understand what the root cause is, but I would like to.

seems that is related with userService, in the end I don't figure out what is