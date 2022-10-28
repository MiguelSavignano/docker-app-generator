# BUILD STAGE
FROM node:10.16.3-alpine as build

WORKDIR /app
# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:templates
RUN npm run build
RUN echo "v2.0.0" > ./build/verstion.txt

FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf /etc/default.conf
# ENV PORT=80
# CMD nginx -g 'daemon off;'
