{{#if private_npm}}
# docker build -t myApp --build-arg=NPM_TOKEN=$NPM_TOKEN .
{{/if}}
{{#unless private_npm}}
# docker build -t myApp .
{{/unless}}

# BUILD STAGE
FROM node:{{node_version}} as build

WORKDIR /app
# Node modules cache layer
{{#if private_npm}}
{{#ifEquals javascrit_package_manager 'npm'}}
ARG NPM_TOKEN
COPY package.json package-lock.json ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  npm ci && \\
  rm -f .npmrc;
{{/ifEquals}}
{{#ifEquals javascrit_package_manager 'yarn'}}
ARG NPM_TOKEN
COPY package.json yarn.lock ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  yarn install --pure-lockfile && \\
  rm -f .npmrc;
{{/ifEquals}}
{{/if}}
{{#unless private_npm}}
{{#ifEquals javascrit_package_manager 'npm'}}
COPY package.json package-lock.json ./
RUN npm ci
{{/ifEquals}}
{{#ifEquals javascrit_package_manager 'yarn'}}
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
{{/ifEquals}}
{{/unless}}

COPY . .
RUN npm run build

{{#ifEquals server_conf 'nodejs'}}

# BUILD SERVER STAGE
FROM node:10.16.3-slim as server
WORKDIR /app
# Node modules cache layer
COPY server/package.json server/package-lock.json /app/
RUN npm ci
COPY server .
CMD npm start
{{/ifEquals}}

# FINAL STAGE
{{#ifEquals server_conf 'nginx'}}
FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/default.conf.template
ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
{{/ifEquals}}
{{#ifEquals server_conf 'nodejs'}}
FROM nginx:1.15
WORKDIR /app
COPY --from=build /app/build /app/build
# Install nodejs
COPY --from=node:{{node_version}}-slim /usr/local/bin/ /usr/local/bin/
COPY --from=node:{{node_version}}-slim /usr/local/lib/ /usr/local/lib/

# SERVER folder
COPY --from=server /app/ /app/server
COPY nginx/conf.d /etc/nginx/conf.d

CMD /bin/bash -c "cd server && PORT=4000 npm start &; exec nginx -g 'daemon off;'"
{{/ifEquals}}
