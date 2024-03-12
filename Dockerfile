FROM node:19.2-alpine3.16 as base

RUN npm i -g ts-node

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

FROM base as production

ENV NODE_PATH=./build

EXPOSE 8080

RUN npm run build



CMD ["npm","start"]