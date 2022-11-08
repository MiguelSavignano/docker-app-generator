
const  axios = require('axios')
const fs = require('fs')

class DockerHubAPI {
  constructor(repositoryName) {
    this.repositoryName = repositoryName
    this.allTags = []
  }

  async getTags({url = `https://hub.docker.com/v2/repositories/library/${this.repositoryName}/tags?page_size=100`, filterFnc} = {}) {
    const { data : { results, next }} = await axios.get(url)
    this.allTags = [...this.allTags, ...results.filter(filterFnc).map(it => it.name)]
    if (next && this.allTags.length <= 300) {
      return this.getTags({url: next, filterFnc})
    } else {
      return this.allTags
    }
  }
}

function isAlpine({name}) {
  const [_, type] = name.split('-')
  if (!type) return false
  return type.includes("alpine")
}

function validVersion({version}) {
  const [major, min, _] = version.split('.')
  return parseInt(major) > 1
}

function isSlim({name}) {
  const [version, type] = name.split('-')
  if(!validVersion({version})) return false
  if (!type) return false
  return type.includes("slim")
}

async function getTagsAndWriteFile({repositoryName, filterFnc, fileName}) {
  const tags = await new DockerHubAPI(repositoryName).getTags({filterFnc})
  fs.writeFileSync(`src/select-options/${fileName}.json`, JSON.stringify(tags.sort(), null, 2))
}

async function run () {
  getTagsAndWriteFile({repositoryName: 'node', filterFnc: isAlpine, fileName: 'node-alpine'})
  getTagsAndWriteFile({repositoryName: 'ruby', filterFnc: isSlim, fileName: 'ruby-slim'})
}

run()
