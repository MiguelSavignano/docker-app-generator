import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

require('codemirror/mode/yaml/yaml');

export const template = () => `version: "3.4"
services:
  web:
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      - 8080:8080
    environment:
      PORT: 8080
`;

export default (props) => (
  <CodeSnippet mode="yaml" template={template} {...props} />
);
