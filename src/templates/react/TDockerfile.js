import React from 'react';
import { CodeSnippet } from '../CodeSnippet';
import { nodeModulesCacheLayer } from '../nodejs/TDockerfile';

require('codemirror/mode/dockerfile/dockerfile');

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
