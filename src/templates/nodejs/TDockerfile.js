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
COPY package.json package-lock.json ./
RUN npm ci
<% } -%>
<% if (javascrit_package_manager === 'yarn' && private_npm) { -%>
ARG NPM_TOKEN
COPY package.json yarn.lock ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  yarn install --pure-lockfile && \\
  rm -f .npmrc;
<% } -%>
<% if (javascrit_package_manager === 'yarn' && !private_npm) { -%>
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
<% } -%>`;

module.exports.nodeModulesCacheLayer = nodeModulesCacheLayer;

const typescriptTemplate = `# BUILD STAGE
FROM node:<%= node_version %>-alpine as build

WORKDIR /app

${nodeModulesCacheLayer}

# Buid with dev dependencies (typescript)
COPY . .
RUN npm run build
RUN rm -r node_modules

# FINAL STAGE
FROM node:<%= node_version %>-alpine
ENV NODE_ENV=production

COPY --from=build /app/dist/ /app/dist/
# Install only production node_modules
${nodeModulesCacheLayer}

CMD ['npm', 'start']`;

module.exports.default = `<% if (typescript) { -%>
  ${typescriptTemplate}
<% } else { -%>
FROM node:<%= node_version %>-alpine
WORKDIR /app
ENV NODE_ENV=production

${nodeModulesCacheLayer}

COPY . .

CMD ['npm', 'start']
FROM nodejs
<% } -%>
`;
