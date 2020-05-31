import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

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

const Dockerfile = () => {
  const [{ form }] = useStateValue();

  return (
    <CodeMirror
      value={template(form)}
      options={{
        mode: 'text',
        theme: 'dracula',
        lineNumbers: true,
      }}
    />
  );
};

export default Dockerfile;
