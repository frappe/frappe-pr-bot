
// const { DateTime } = require('luxon')
// const datetime = DateTime.local()

const Database = require('./database')

const db = new Database()

db.connect().then(() => {
  db.fetchAllBenches().then((crap) => {
    console.log(crap)
  })
})

// db.fetchAllBenches().then(resp => {
// })

// db.createRecord('bench_name5', 100, 'frappe', 3, datetime, 'codingcoffee')

// console.log('database object: ', db)
