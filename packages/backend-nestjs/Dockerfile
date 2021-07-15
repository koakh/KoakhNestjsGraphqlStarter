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
RUN npm i lerna -g --loglevel notice

# copy the root package.json and install, then copy the relevant packages.
COPY package.json .
# COPY package.json package-lock*.json /usr/src/app/
RUN npm install --loglevel notice

# copy relevant packages
COPY \
  packages/server-graphql/ ./packages/server-graphql/ \
  packages/common-cc/ ./packages/common-cc/ \
  packages/asset-cc/ ./packages/asset-cc/ \
  packages/cause-cc/ ./packages/cause-cc/ \
  packages/participant-cc/ ./packages/participant-cc \
  packages/person-cc/ ./packages/person-cc/ \
  packages/transaction-cc/ ./packages/transaction-cc/

COPY lerna.json .
RUN lerna bootstrap

CMD [ "npm", "run", "--prefix", "packages/server-graphql", "start:container" ]