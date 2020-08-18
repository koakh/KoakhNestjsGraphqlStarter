# README

## Description

Koakh minimal GraphQL Starter boilerplate

### Features

- https
- protected and unprotected query, mutations and subscriptions
- jwt authentication/authorization
- refresh and revoke token with versions
- moke static json data (replace with data layer repository )
- rest client operations (require vscode extension REST Client)
- docker image

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker commands

> use -f `docker-compose-production.yml` to work with `production`

```shell
# start dev stack
$ docker-compose up
# start dev stack daemon
$ docker-compose up -d
# enter container dev
$ docker exec -it koakh-nestjs-graphql-starter sh
# teardown/ clean
$ docker-compose down --remove-orphans
# logs
$ docker-compose logs -f
```

## Stay in touch

- Author - [koakh](https://koakh.com)

## License

  Nest is [MIT licensed](LICENSE).
