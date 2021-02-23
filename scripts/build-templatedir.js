const fs = require('fs')
const globby = require('globby');

(async () => {
  const paths = await globby(['templates/**/*']);
  const result = paths.reduce((memo, path) => {
    const fileContent = fs.readFileSync(path, 'utf-8')
    return { ...memo,[path]: Buffer.from(fileContent).toString('base64') }
  }, {})
  console.log(JSON.stringify(result, null, 2))
})();
