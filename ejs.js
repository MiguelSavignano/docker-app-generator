const ejs = require('ejs');
const fs = require('fs');
const path = 'src/templates/nodejs/Dockerfile.ejs';
const templates = require('./src/templates.json');
const base64 = require('base-64');
const utf8 = require('utf8');

function decode64(text) {
  return utf8.decode(base64.decode(text));
}

const templateText = fs.readFileSync(path, 'utf-8');

const fnCallback = ejs.compile(templateText, { client: true });
const data = {
  javascrit_package_manager: 'npm',
  node_version: '10.16.3',
  private_npm: false,
  server_conf: 'nginx',
  typescript: false
};

const result = fnCallback(data, null, function (path, _data) {
  console.log(path, data);
  const text = templates[`src/templates/${path}`]
  return ejs.render(decode64(text), data)
});

console.log(result);
