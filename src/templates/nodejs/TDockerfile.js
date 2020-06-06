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

const templateTypescript = ({
  node_version,
  javascrit_package_manager,
  private_npm,
}) => `# BUILD STAGE
FROM node:${node_version}-alpine as build

WORKDIR /app

${nodeModulesCacheLayer({ javascrit_package_manager, private_npm })}

# Buid with dev dependencies (typescript)
COPY . .
RUN npm run build
RUN rm -r node_modules

# FINAL STAGE
FROM node:${node_version}-alpine
ENV NODE_ENV=production

COPY --from=build /app/dist/ /app/dist/
# Install only production node_modules
${nodeModulesCacheLayer({ javascrit_package_manager, private_npm })}

CMD ['npm', 'start']`;

const templateJs = ({
  node_version,
  javascrit_package_manager,
  private_npm,
}) => `FROM node:${node_version}-alpine
WORKDIR /app

ENV NODE_ENV=production
${nodeModulesCacheLayer({ javascrit_package_manager, private_npm })}

COPY . .

CMD ['npm', 'start']`;

export const template = ({ typescript, ...rest }) => {
  if (typescript) {
    return templateTypescript(rest);
  }
  return templateJs(rest);
};
const Dockerfile = (props) => (
  <CodeSnippet mode="dockerfile" template={template} {...props} />
);

export default Dockerfile;
