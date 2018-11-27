
const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = {
  read: (filepath) => {
    return (fs.readFileSync(filepath))
  },

  exists: (filepath) => {
    return fs.existsSync(filepath)
  },

  create_dir: (filepath) => {
    return fs.mkdirSync(filepath)
  },

  get_homedir: () => {
    return os.homedir()
  },

  path_resolve: (a, b) => {
    return path.resolve(a, b)
  }
}
