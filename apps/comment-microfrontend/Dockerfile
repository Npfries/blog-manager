FROM node:18 AS base

WORKDIR /app

COPY package*.json .

COPY --from=repo package-lock.json package-lock.json

RUN npm ci

COPY . . 

COPY --from=repo ./lib/ ./node_modules/@blog-manager/

FROM base AS build

RUN npm run build

FROM base AS dev

ENTRYPOINT [ "npm", "run", "dev" ]