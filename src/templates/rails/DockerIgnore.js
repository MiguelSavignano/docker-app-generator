import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
require('codemirror/mode/xml/xml');

export const template = () => `
# Ignore all files from .gitignore
# echo .git > .dockerignore && cat .gitignore >> .dockerignore
.git

/log/*
/tmp/*

.byebug_history

public/packs
public/packs-test
public/uploads

node_modules
coverage
yarn-error.log
.DS_Store
`;

export const DockerIgnore = () => {
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

export default DockerIgnore;
