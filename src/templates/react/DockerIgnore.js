import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

export const template = () =>
  `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
# echo .git > .dockerignore && cat .gitignore >> .dockerignore

.git
Dockerfile

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;

export default () => (
  <CodeSnippet mode="text" template={template} fileName=".dockerignore" />
);
