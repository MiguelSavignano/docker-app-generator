import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Clipboard from 'react-clipboard.js';
import { useStateValue } from '../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/yaml/yaml'

const modeMapping = (fileName) => {
  if (new RegExp('\.(yaml|yml)').test(fileName)){
    return 'yaml'
  }
  if (fileName === 'Dockerfile') {
    return 'dockerfile'
  }
  return 'text'
}

const DownloadIcon = ({ fileName = 'snippet', text }) => {
  const fileContent = encodeURIComponent(text);

  return (
    <a
      className="link-icon-rounded"
      href={`data:none/plain;charset=utf-8,${fileContent}`}
      download={fileName}
    >
      <i className="fa fa-download" aria-hidden="true"></i>
    </a>
  );
};

export const CodeSnippet = ({ mode, template, fileName }) => {
  const [{ form }] = useStateValue();
  const codeSnippet = template(form);
  const [codeSnippetState, setCodeSnippet] = useState(codeSnippet);
  mode = mode || modeMapping(fileName)
  return (
    <>
      <div className="code-actions-container">
        <DownloadIcon fileName={fileName} text={codeSnippet} />
        <Clipboard
          className="button-icon-rounded"
          data-clipboard-text={codeSnippetState}
        >
          <i className="fa fa-clipboard" aria-hidden="true"></i>
        </Clipboard>
      </div>
      <CodeMirror
        value={codeSnippet}
        options={{
          mode,
          lineWrapping: true,
          theme: 'dracula',
          lineNumbers: true,
        }}
        onChange={(codeMirrior) => {
          setCodeSnippet(codeMirrior.getValue());
        }}
      />
    </>
  );
};
