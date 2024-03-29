import React from 'react';
import ejs from 'ejs';
import * as Handlebars from 'handlebars';
import { CodeSnippet } from './CodeSnippet';
const base64 = require('base-64');
const utf8 = require('utf8');
const templates = require('../templates.json');
const templateFolder = 'templates'
const securityRender = {
  document: {},
  alert: () => {},
  confirm: () => {},
  localStorage: () => {},
};

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

function decode64(text) {
  return utf8.decode(base64.decode(text));
}

export const CodeSnippetTemplate = ({ fileName, templateName, ...rest }) => {
  if (!templates[templateName]) {
    return <h1>Not found template: {templateName}</h1>;
  }

  const templateText = decode64(templates[templateName])
  return (
    <CodeSnippet
      {...rest}
      fileName={fileName}
      template={(data) => {
        const viewData = { ...data, ...securityRender };
        if (/\.ejs/.test(templateName)) {
          return ejs.render(templateText, viewData);
        } else {
          return Handlebars.compile(templateText)(viewData);
        }
      }}
    />
  );
};


// ejs client render with include
