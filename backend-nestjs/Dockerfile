FROM node:12.22.2-alpine As development

WORKDIR /usr/src/app

# RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
# RUN npm install --quiet node-gyp typescript -gs
# require to build bcrypt: https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#docker
RUN apk --no-cache add --virtual builds-deps build-base python

COPY package*.json ./

RUN npm install --quiet
# RUN npm install --only=development
# In alpine based images, force recompiling the bcrypt native addon after a npm install with this command
RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

FROM node:12.22.2-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
