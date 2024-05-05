FROM node:19.2-alpine3.16 as base

RUN npm i -g ts-node

WORKDIR /app

COPY package*.json ./

RUN npm i 
RUN npm run build

COPY . .

FROM base as production

ENV NODE_PATH=./build






CMD ["npm","start"]

EXPOSE 8082