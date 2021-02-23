const fs = require('fs')
const globby = require('globby');

(async () => {
  const paths = await globby(['src/templates/**/*']);
  const result = paths.reduce((memo, path) => {
    const fileContent = fs.readFileSync(path, 'utf-8')
    memo[path] = Buffer.from(fileContent).toString('base64')

    return memo
  }, {})

  fs.writeFileSync('src/templates.json', JSON.stringify(result, null, 2))
})();
