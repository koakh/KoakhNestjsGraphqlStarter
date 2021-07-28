# NOTES

notes for app and app-lib

```shell
$ curl localhost:3000 | jq
{
  "message": "Hello World from AppModule::AppService!"
}

$ curl -X POST localhost:3000/adduser -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 1
}

$ curl -X POST localhost:3000/increment -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 9
}

$ curl localhost:3000/config | jq
{
  "secret": "90dcfcd8-d3bd-4af0-a8a3-f3e03181a83f",
  "expiresIn": "120s"
}

$ curl localhost:3000/appservice | jq
{
  "message": "Hello World from AppModule::AppService!"
}

$ curl localhost:3000/userservice | jq
{
  "message": "Hello World from AppModule::AppService!"
}
```