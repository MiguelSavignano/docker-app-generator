import React from 'react';
import ejs from 'ejs';
import { CodeSnippet } from './CodeSnippet';
import Templates from './index';

export const CodeSnippetTemplate = ({ fileName, templateName, ...rest }) => {
  const templateText = Templates[templateName]
  if (!templateText) {
    return <h1>Not found template: {templateName}</h1>
  }
  return <CodeSnippet {...rest} fileName={fileName} template={(data) => {
    return ejs.render(templateText, data)
  }} />
 }
