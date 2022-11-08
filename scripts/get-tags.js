
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

async function run () {
  const tags = await new DockerHubAPI('node').getTags({filterFnc: isAlpine})
  fs.writeFileSync('src/select-options/node-alpine.json', JSON.stringify(tags.sort(), null, 2))
}

run()
