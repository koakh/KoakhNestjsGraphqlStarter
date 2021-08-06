# Notes

- [Notes](#notes)
  - [Lerna](#lerna)
## Lerna

```shell
# add package
$ PACKAGE="@koakh/nestjs-package-jwt-authentication-graphql"
$ SCOPE="@koakh/koakh-nestjs-graphql-starter"
$ npx lerna add ${PACKAGE} --scope ${SCOPE}
# some added packages
$ npx lerna add @golevelup/nestjs-modules --scope @koakh/nestjs-package-jwt-authentication-graphql 
$ npx lerna add @nestjs/jwt --scope @koakh/koakh-nestjs-graphql-starter
$ npx lerna add npm-check --scope @koakh/koakh-nestjs-graphql-starter
$npx lerna add npm-check-updates --scope @koakh/koakh-nestjs-graphql-starter
```
