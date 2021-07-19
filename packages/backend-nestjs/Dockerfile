# FROM node:14.4.0-alpine3.10
FROM jameskyburz/node:8.16.0-alpine

WORKDIR /usr/src/app

# require to buil native modules on alpine
# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python && \
#   npm install --quiet node-gyp -g &&\
#   # npm install --quiet && \
#   apk del native-deps

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

# install Lerna globally
# RUN npm i lerna -g --loglevel notice

COPY . .

# copy the root package.json and install, then copy the relevant packages.
# COPY package.json .
# COPY package.json package-lock*.json /usr/src/app/
RUN npm install --loglevel notice

# copy relevant packages
# COPY \
#   packages/backend-nestjs/ ./packages/backend-nestjs/ \
#   packages/nestjs-package-jwt-authentication-graphql/ ./packages/nestjs-package-jwt-authentication-graphql/

# COPY lerna.json .
# RUN lerna bootstrap

# CMD [ "npm", "run", "--prefix", "packages/backend-nestjs", "start:container" ]
CMD [ "npm", "run", "start:container" ]