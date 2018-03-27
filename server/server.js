const sqlite3 = require('sqlite3')
const express = require('express')
const path = require('path')

const { sessionRoutes } = require('./session')

const db = new sqlite3.Database("../activitiesDB.db")
console.log("Successfully opened the database.")

const app = express()

app.use(express.json()) // Adds middleware to express that will automatically parse JSON bodies. No longer required to parse the body from the JSON format sent by the front end.
sessionRoutes(app)

app.get('/activities', (req, res) => {
  const query = 'SELECT * FROM activity ORDER BY name ASC;'

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Database error.', err })
      return
    }

    res.json(rows)
  })
})

app.get('/timeCards', (req, res) => {
  const query = `SELECT activity.name, timeCard.activity_date, timeCard.duration, timeCard.description
  FROM timeCard
  INNER JOIN activity
  ON timeCard.activity_id = activity.id;`

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Database error.', err })
      return
    }

    res.json(rows)
  })
})

app.post('/activities/new', (req, res) => {
  const activity = req.body

  db.run("INSERT INTO activity (name) VALUES (?);", activity.name, err => {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(400).end('Activity already exists in database.')
        return
      }

      res.status(500).json({ message: 'Database error.', err })
      return
    }

    res.end()
  })
})

app.post('/postTime', (req, res) => {
  const timeCard = req.body
  const query = "INSERT INTO timeCard (activity_id, activity_date, duration, description) VALUES (?, ?, ?, ?)"

  db.run(query, timeCard.activityId, timeCard.date, timeCard.duration, timeCard.description, err => {
    if (err) {
      res.status(500).json({ message: 'Database error.', err })
      return
    }

    res.end()
  })
})

app.use(express.static('../client'))

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)
