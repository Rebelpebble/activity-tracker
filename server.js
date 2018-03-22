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

app.post('/postTime', function(req, res) {
  const timeCard = req.body
  const timeCardNameValuePairs = {}

  timeCard.forEach(item => {
    timeCardNameValuePairs[item.name] = item.value
  })

  const activityName = timeCardNameValuePairs.activity

  const query = `SELECT * FROM activity WHERE name = "${activityName}"`

  // Find the activity in the activity table.
  myActivities.all(query, function(err, rows) {
    if (err) {
      res.status(500).end('Activity not in database.')
    }

    console.log(rows)
    console.log(timeCardNameValuePairs)

    // Make a time card against that activity.
    myActivities.run("INSERT INTO timeCard (activity_id, activity_date, duration, description) VALUES (?) (?) (?) (?)",
    rows[0].id,
    timeCardNameValuePairs.date,
    timeCardNameValuePairs.duration,
    timeCardNameValuePairs.description,
    function (err) {
      if (err) {
        res.status(500).json({
          message: 'Database error.',
          error: err
        })
        return
      }

      res.end()
    })
  })
})

app.use(express.static('client'))

app.get('*', (req, res) => {
  res.status(404).end('Not Found.')
})

app.listen(8080)
