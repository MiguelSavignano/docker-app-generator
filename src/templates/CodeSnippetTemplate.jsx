import React from 'react';
import ejs from 'ejs';
import { CodeSnippet } from './CodeSnippet';
import Templates from './index';

require('codemirror/mode/nginx/nginx');
require('codemirror/mode/dockerfile/dockerfile');
require('codemirror/mode/yaml/yaml');

export const CodeSnippetTemplate = ({fileName , mode, templateName}) => {
  const templateText = Templates[templateName]
  if (!templateText) {
    return <h1>Not found template: {templateName}</h1>
  }
  return <CodeSnippet fileName={fileName} mode={mode} template={(data) => {
    return ejs.render(templateText, data)
  }} />
 }
