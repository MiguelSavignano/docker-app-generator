import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

require('codemirror/mode/dockerfile/dockerfile');

export const template = ({
  node_version,
  javascrit_package_manager,
  private_npm,
  server_conf,
}) =>
  `# BUILD STAGE
FROM node:${node_version}-alpine as build

#RUN apk -u add git openssh

WORKDIR /app
${
  javascrit_package_manager === 'npm'
    ? `
# Node modules cache layer
${private_npm ? `ARG NPM_TOKEN` : ``}
COPY package.json package-lock.json ./
${
  private_npm
    ? `# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  npm ci && \\
  rm -f .npmrc`
    : `RUN npm ci`
}
`
    : `# Node modules cache layer
COPY package.json yarn.lock ./
${
  private_npm
    ? `# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  yarn install --pure-lockfile && \\
  rm -f .npmrc`
    : `RUN yarn install --pure-lockfile`
}
`
}
COPY . .
RUN npm run build
# FINAL STAGE
${(() => {
  if (server_conf === 'nginx') {
    return `FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template

ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"`;
  } else if (server_conf === 'nodejs') {
    return `FROM node:${node_version}-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
`;
  }
})()}
`;

const Dockerfile = () => (
  <CodeSnippet mode="dockerfile" template={template} fileName="Dockerfile" />
);

export default Dockerfile;
