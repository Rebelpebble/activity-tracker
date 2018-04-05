const sqlite3 = require('sqlite3')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const { buildSessionCheckMiddleware } = require('./session-check')
const { buildSessionsRouter } = require('./session')
const { buildActivitiesRouter } = require('./activities.js')
const { buildTimeCardsRouter } = require('./time-cards.js')

const db = new sqlite3.Database("../activitiesDB.db")
console.log("Successfully opened the database.")

const sessionCheck = buildSessionCheckMiddleware(db)
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(express.static('../client'))

app.use(buildSessionsRouter(db))

app.use(sessionCheck, buildActivitiesRouter(db))
app.use(sessionCheck, buildTimeCardsRouter(db))

app.get('/logout', sessionCheck, (req, res) => {
  const query = `DELETE FROM session WHERE user_id = ?`

  db.run(query, req.currentUserId, (err) => {
    if (err) {
      res.status(500).json({ message: 'Database error.', err })
    }
  })

  res.end()
})

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)
