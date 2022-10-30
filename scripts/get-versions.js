
const  axios = require('axios')
const fs = require('fs')

class DockerHubAPI {
  constructor(repositoryName) {
    this.repositoryName = repositoryName
    this.allTags = []
  }

  isAlpine(name) {
    const [_, type] = name.split('-')
    if (!type) return false
    return type.includes("alpine")
  }

  async getTags(url = `https://hub.docker.com/v2/repositories/library/${this.repositoryName}/tags?page_size=100`) {
    const { data : { results, next }} = await axios.get(url)
    this.allTags = [...this.allTags, ...results.filter(it => this.isAlpine(it.name) ).map(it => it.name)]
    if (next && this.allTags.length <= 300) {
      return this.getTags(next)
    } else {
      return this.allTags
    }
  }
}

async function run () {
  const tags = await new DockerHubAPI('node').getTags()
  fs.writeFileSync('src/node-tags.json', JSON.stringify(tags.sort(), null, 2))
}

run()
