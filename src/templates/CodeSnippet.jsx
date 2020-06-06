import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Clipboard from 'react-clipboard.js';
import { useStateValue } from '../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

export const CodeSnippet = ({ mode, template }) => {
  const [{ form }] = useStateValue();
  const codeSnippet = template(form);
  const [codeSnippetState, setCodeSnippet] = useState(codeSnippet);

  return (
    <>
      <Clipboard
        className="clipboard-button"
        data-clipboard-text={codeSnippetState}
      >
        Cp
      </Clipboard>
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
