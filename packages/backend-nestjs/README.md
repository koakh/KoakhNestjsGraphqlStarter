# README

## Description

GraphQL based on [Nest](https://github.com/nestjs/nest) framework, with `type-graphql` and other cool stuff

## Pre-Requisites

1. Node Js

2. this project must have a running hurley hyperledger network running, with **person chaincode** deployed, follow instructions on [README.me](../../README.md)

## Configure environment variables

default `.env`

```conf
# HTTP_SERVER_PORT=3001
HTTPS_SERVER_PORT=3443
ACCESS_TOKEN_JWT_SECRET=rGtqzOjlW9OG47ncUKbPDltTxA3EtZFp
REFRESH_TOKEN_JWT_SECRET=3XgiizDr35A4H1I9ocOPTFeUkFSfKkSy

# debug, higher expires time out: use 15s | 1d to debug refreshToken
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
# use only in development mode to skip increment tokenVersion
REFRESH_TOKEN_SKIP_INCREMENT_VERSION=true
```

## Start GraphQL Api

```shell
# in repo root folder

# run in prod mode
$ npx lerna run start:prod --scope @solidary-chain/server-graphql --stream
# run in dev mode
$ npx lerna run start:dev --scope @solidary-chain/server-graphql --stream
# or run in debug mode
$ npx lerna run start:debug --scope @solidary-chain/server-graphql --stream
```

## Play with GraphQL Playground

- [graphql playground](https://192.168.1.133:3443/graphql)

![personLogin](./assets/images/010.png)

before fire some graphql queries/mutations we must get `accessToken` with `personLogin` mutation

open graphql playground and fire personLogin mutation to get the `accessToken`

```json
mutation {
  personLogin(loginPersonData: {
    username:"johndoe", password:"12345678"}
  ) {
    accessToken
  }
}
```

response with `accessToken`

```json
{
  "data": {
    "personLogin": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1Nzc0MDgxMjQsImV4cCI6MTU3NzQwOTAyNH0.u5PqPpgiKkq3Z5Dqsvg798whRromExhLTUOQ8QkYN_o"
    }
  }
}
```

![participants](./assets/images/020.png)

now add a new query `participants`

```json
query {
  participants {
    id
    name
    msp
    identities {
      id
      status
      fingerprint
    }
  }
}
```

add the `authorization` http header

```json
{
  "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1Nzc0MDgxMjQsImV4cCI6MTU3NzQwOTAyNH0.u5PqPpgiKkq3Z5Dqsvg798whRromExhLTUOQ8QkYN_o"
}
```

and fire the query. done

## Insomnia

![import workspace](assets/images/100.png)

to play with all the query and mutations install [insomnia client](https://insomnia.rest/) and import workspace `insomnia-workspace/Insomnia.json`, this has all the queries, mutations and subscriptions ready to use


![insomnia](assets/images/110.png)

> insomnia don't work with subscriptions (yet), to use subscriptions use `graphql playground`
