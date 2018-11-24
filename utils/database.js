
const config = require('./config')
const { get_config } = config

const { dbName, dbPassword, dbUsername, dbHost, dbDialect, dbPort } = get_config()

const Sequelize = require('sequelize')

if (dbDialect === 'sqlite') {
  const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // SQLite only
    storage: '~/.frappe-pr-bot/database.sqlite'
  })
} else {
  // Or you can simply use a connection uri
  const sequelize = new Sequelize(`${dbDialect}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`)
}

module.exports = class Database {
	constructor(dbName, dbPassword, dbUsername, dbHost, dbDialect, dbPort){
		// Check if the database exists
		// if it does, return the db object
		// else create it and return the db object
		this.dbName = dbName
		this.dbPassword = dbPassword
		this.dbUsername = dbUsername
		this.dbHost = dbHost
		this.dbDialect = dbDialect
		this.dbPort = dbPort

		if db_exists() {}
	},

  init: () => {},

  testConnection: () => {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
        return true
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
        return false
      })
  }
}
