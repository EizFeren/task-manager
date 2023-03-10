FROM node:19-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
ARG port
COPY [ "package.json", "yarn.lock", "./" ]
RUN yarn install
COPY . .
CMD yarn run db:migrations:do:all && yarn run db:seeders:do:all && yarn run start:dev
EXPOSE $port
