module.exports.nodeModulesCacheLayer = `# Node modules cache layer
ARG NPM_TOKEN
COPY package.json package-lock.json ./
# keep NPM_TOKEN private
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\
  npm ci && \\
  rm -f .npmrc;
`;

module.exports.default = ``;

// if (javascrit_package_manager === 'npm') {
//   if (private_npm) {
//     return [
//       '# Node modules cache layer',
//       'ARG NPM_TOKEN',
//       'COPY package.json package-lock.json ./',
//       '# keep NPM_TOKEN private',
//       'RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\',
//       '  npm ci && \\',
//       '  rm -f .npmrc;',
//     ].join('\n');
//   } else {
//     return [
//       '# Node modules cache layer',
//       'COPY package.json package-lock.json ./',
//       'RUN npm ci',
//     ].join('\n');
//   }
// } else if (javascrit_package_manager === 'yarn') {
//   if (private_npm) {
//     return [
//       '# Node modules cache layer',
//       'ARG NPM_TOKEN',
//       'COPY package.json yarn.lock ./',
//       '# keep NPM_TOKEN private',
//       'RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > /app/.npmrc && \\',
//       '  yarn install --pure-lockfile && \\',
//       '  rm -f .npmrc;',
//     ].join('\n');
//   } else {
//     return [
//       '# Node modules cache layer',
//       'COPY package.json yarn.lock ./',
//       'RUN yarn install --pure-lockfile',
//     ].join('\n');
//   }
// }
// }
