
const file = require('./fileutils')

module.exports = {
  get_config: () => {
    return JSON.parse(file.read('config.json'))
  }
}
