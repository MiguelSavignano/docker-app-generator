import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Clipboard from 'react-clipboard.js';
import { useStateValue } from '../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

const DownloadIcon = ({ fileName = 'snippet', text }) => {
  const fileContent = encodeURIComponent(text);

  return (
    <a
      href={`data:text/plain;charset=utf-8,${fileContent}`}
      download={fileName}
    >
      Download
    </a>
  );
};

export const CodeSnippet = ({ mode, template, fileName }) => {
  const [{ form }] = useStateValue();
  const codeSnippet = template(form);
  const [codeSnippetState, setCodeSnippet] = useState(codeSnippet);

  return (
    <>
      <div className="clipboard-container">
        <DownloadIcon fileName={fileName} text={codeSnippet} />
        <Clipboard
          className="clipboard-button"
          data-clipboard-text={codeSnippetState}
        >
          <i class="fa fa-clipboard" aria-hidden="true"></i>
        </Clipboard>
      </div>
      <CodeMirror
        value={codeSnippet}
        options={{
          mode,
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
