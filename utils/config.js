
const fs = require('fs')

module.export = {
  get_config: () => {
    return JSON.parse(fs.readFileSync('config.json'))
  }
}
