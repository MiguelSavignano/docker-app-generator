import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { useStateValue } from '../../state';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

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

const NgixConf = () => {
  const [{ form }] = useStateValue();

  return (
    <CodeMirror
      value={template(form)}
      options={{
        mode: 'conf',
        theme: 'dracula',
        lineNumbers: true,
      }}
    />
  );
};

export default NgixConf;
