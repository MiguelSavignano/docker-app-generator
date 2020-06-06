import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

require('codemirror/mode/dockerfile/dockerfile');

export const nodeModulesCacheLayer = ({
  javascrit_package_manager,
  private_npm,
}) => {
  if (javascrit_package_manager === 'npm') {
    if (private_npm) {
      return [
        '# Node modules cache layer',
        'ARG NPM_TOKEN',
        'COPY package.json package-lock.json ./',
        '# keep NPM_TOKEN private',
        'RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\',
        '  npm ci && \\',
        '  rm -f .npmrc;',
      ].join('\n');
    } else {
      return [
        '# Node modules cache layer',
        'COPY package.json package-lock.json ./',
        'RUN npm ci',
      ].join('\n');
    }
  } else if (javascrit_package_manager === 'yarn') {
    if (private_npm) {
      return [
        '# Node modules cache layer',
        'ARG NPM_TOKEN',
        'COPY package.json yarn.lock ./',
        '# keep NPM_TOKEN private',
        'RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\',
        '  yarn install --pure-lockfile && \\',
        '  rm -f .npmrc;',
      ].join('\n');
    } else {
      return [
        '# Node modules cache layer',
        'COPY package.json yarn.lock ./',
        'RUN yarn install --pure-lockfile',
      ].join('\n');
    }
  }
};

export const template = ({
  node_version,
  javascrit_package_manager,
  private_npm,
  server_conf,
}) =>
  `# BUILD STAGE
FROM node:${node_version}-alpine as build

WORKDIR /app

${nodeModulesCacheLayer({ javascrit_package_manager, private_npm })}

COPY . .
RUN npm run build

# FINAL STAGE
${(() => {
  if (server_conf === 'nginx') {
    return `FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/default.conf.template

ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"`;
  } else if (server_conf === 'nodejs') {
    return `FROM node:${node_version}-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
`;
  }
})()}
`;

const Dockerfile = (props) => (
  <CodeSnippet mode="dockerfile" template={template} {...props} />
);

export default Dockerfile;
