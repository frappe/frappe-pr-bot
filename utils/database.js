
// const config_utils = require('./config')
// const config = config_utils.get_config()

const file = require('./fileutils')
const Sequelize = require('sequelize')
const sqlite = require('sqlite3').verbose()

module.exports = class Database {
  constructor () {
    const config = require('./config').get_config()
    const { db_name: dbName, db_password: dbPassword, db_username: dbUsername, db_host: dbHost, db_dialect: dbDialect, db_port: dbPort } = config

    this.dbName = dbName
    this.dbPassword = dbPassword
    this.dbUsername = dbUsername
    this.dbHost = dbHost
    this.dbDialect = dbDialect || 'sqlite'
    this.dbPort = dbPort
    this.dbPath = '~/.frappe-pr-bot/database.sqlite'

    this.dbPath = this.dbPath.replace('~', file.get_homedir())
  }

  async connect () {
    if (!this.dbExists()) {
      this.createDb()
    }

    // Establish Connection
    this.establishConnection()

    // Test Connection
    this.testConnection()

    // Create Model
    this.defineBenchModel()
  }

  async defineBenchModel () {
    console.log('Define the Bench Model')
    this.benchModel = this.sequelize.define('bench', {
      benchName: {type: Sequelize.STRING, primaryKey: true},
      prNo: Sequelize.INTEGER,
      appTested: Sequelize.STRING,
      pythonVersion: Sequelize.INTEGER,
      requestedAt: Sequelize.DATE,
      requestedBy: Sequelize.STRING
    })
  }

  async fetchAllBenches () {
    console.log('Trying to fetch all benches')
    this.benchModel.findAll().then(projects => {
      console.log('Got all benches')
      return projects
    })
    console.log('This shouldn\'t be printed')
  }

  async deleteRecord () {

  }

  async updateRecord () {

  }

  async createRecord (benchName, prNo, appTested, pythonVersion, requestedAt, requestedBy) {
    this.benchModel.sync().then(() => {
      return this.benchModel.create({
        benchName: benchName,
        prNo: prNo,
        appTested: appTested,
        pythonVersion: pythonVersion,
        requestedAt: requestedAt,
        requestedBy: requestedBy
      })
    })
  }

  async dbExists () {
    if (file.exists(this.dbPath)) return true
    else return false
  }

  async createDb () {
    // Check if ~/.frappe-pr-bot folder exists
    // If not create it and create the database also
    // If it exits, create database
    let dbPath = this.dbPath.split('/')
    let databaseFileName = dbPath.pop()
    dbPath = dbPath.join('/')
    if (!file.exists(dbPath)) {
      file.create_dir(dbPath)
    }

    dbPath = file.path_resolve(dbPath, databaseFileName)
    let db = new sqlite.Database(dbPath)
    db.close()

    console.log(`New database created at ${dbPath} !`)
  }

  establishConnection () {
    this.sequelize = new Sequelize(this.dbName, this.dbUsername, this.dbPassword, {
      dialect: this.dbDialect,

      // SQLite only
      storage: this.dbPath
    })
    console.log('Established Connection')
  }

  async testConnection () {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection test was successful.')
        return true
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
        return false
      })
  }
}
