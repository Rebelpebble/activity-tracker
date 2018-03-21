const sqlite3 = require('sqlite3')
const express = require('express')

const myActivities = new sqlite3.Database("activitiesDB.db")
console.log("Successfully opened the database.")

const app = express()
app.use(express.json())

app.get('/activities', function (req, res) {
  myActivities.all("SELECT * FROM activity;", (err, rows) => {
    if (err) {
      res.status(500).end('Database error.')
      return
    }

    res.json(rows)
  })
})

app.post('/activities/new', function (req, res) {
  const activity = req.body

  myActivities.run("INSERT INTO activity (name) VALUES (?);", activity.name, function(err) {

    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(400).end('Activity already exists in database.')
        return
      }

      res.status(500).end('Database error.')
      return
    }

    res.end()
  })
})

app.use(express.static('client'))

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)
