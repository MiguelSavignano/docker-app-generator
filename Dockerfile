# BUILD CLIENT STAGE
FROM node:10.16.3-alpine as build

WORKDIR /app

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# BUILD SERVER STAGE

FROM node:10.16.3-slim as server

WORKDIR /app

# Node modules cache layer
COPY server/package.json server/package-lock.json /app/
RUN npm ci

COPY server .

CMD node index.js

# # FINAL STAGE NGINX with nodejs
FROM nginx:1.15

RUN apt-get update -qq && apt-get install -y \
  curl

WORKDIR /app

# Install nodejs
COPY --from=node:10.16.3-slim /usr/local/bin/ /usr/local/bin/
COPY --from=node:10.16.3-slim /usr/local/lib/ /usr/local/lib/

# CLIENT build folder
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY --from=build /app/build/ /app/build

# SERVER folder
COPY --from=server /app/ /app/server

# START service in backgorund

COPY nginx/conf.d /etc/nginx/conf.d

COPY entrypoint.sh /app/entrypoint.sh

CMD /app/entrypoint.sh
