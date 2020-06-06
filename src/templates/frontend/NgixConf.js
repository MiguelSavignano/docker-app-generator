import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

require('codemirror/mode/nginx/nginx');

export const template = () =>
  `server {
  listen       \${PORT};
  server_name  localhost;

  #charset koi8-r;
  #access_log  /var/log/nginx/host.access.log  main;

  location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   /usr/share/nginx/html;
  }
}
`;

export default (props) => (
  <CodeSnippet
    mode="nginx"
    template={template}
    {...props}
    fileName="default.conf.template"
  />
);
