# NOTES

```shell
$ npm i bcrypt @nestjs/jwt @nestjs/graphql @nestjs/passport graphql graphql-subscriptions graphql-type-json passport passport-jwt passport-local uuid yup @nest-middlewares/cookie-parser
```

- https://stackoverflow.com/questions/63356440/how-to-import-a-registerasync-in-a-dynamic-nestjs-module

TypeError: Cannot read property 'provide' of undefined at Module.isCustomProvider _tickCallback (internal/process/next_tick.js:68:7) at Function.Module. The work-around is to import Nest JS Modules directly, and not via Index files. I don't fully understand what the root cause is, but I would like to.

seems that is related with userService, in the end I don't figure out what is