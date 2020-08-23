const nodeModulesCacheLayer = `# Node modules cache layer
<% if (javascrit_package_manager === 'npm' && private_npm) { -%>
ARG NPM_TOKEN
COPY package.json package-lock.json ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  npm ci && \\
  rm -f .npmrc;
<% } -%>
<% if (javascrit_package_manager === 'npm' && !private_npm) { -%>
# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci
<% } -%>
<% if (javascrit_package_manager === 'yarn' && private_npm) { -%>
# Node modules cache layer
ARG NPM_TOKEN
COPY package.json yarn.lock ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  yarn install --pure-lockfile && \\
  rm -f .npmrc;
<% } -%>
<% if (javascrit_package_manager === 'yarn' && !private_npm) { -%>
# Node modules cache layer
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
<% } -%>`;

module.exports.nodeModulesCacheLayer = nodeModulesCacheLayer;

module.exports.default = `FROM node:<%= node_version %>-alpine
WORKDIR /app

ENV NODE_ENV=production
${nodeModulesCacheLayer}

COPY . .

CMD ['npm', 'start']
FROM nodejs`;
