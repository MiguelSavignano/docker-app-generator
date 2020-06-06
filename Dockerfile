# BUILD STAGE
FROM node:10.16.3-alpine as build

WORKDIR /app

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# FINAL STAGE
FROM nginx:1.15

COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/default.conf.template

ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
