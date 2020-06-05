import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Clipboard from 'react-clipboard.js';
import { useStateValue } from '../state';

export const CodeSnippet = ({ mode, template }) => {
  const [{ form }] = useStateValue();
  const codeSnippet = template(form);
  const [codeSnippetState, setCodeSnippet] = useState(codeSnippet);

  return (
    <>
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
      <Clipboard data-clipboard-text={codeSnippetState}>
        Copy to clipboard
      </Clipboard>
    </>
  );
};
