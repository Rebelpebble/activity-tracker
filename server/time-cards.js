const express = require('express')

function buildTimeCardsRouter(db) {
  const router = express.Router()

  router.get('/time-cards', (req, res) => {
    const query = `SELECT activity.name, timeCard.activity_date, timeCard.duration, timeCard.description
    FROM timeCard
    INNER JOIN activity
    ON timeCard.activity_id = activity.id
    WHERE timeCard.user_id = ?;`

    db.all(query, req.currentUserId, (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      res.json(rows)
    })
  })

  router.post('/time-cards', (req, res) => {
    const timeCard = req.body
    const query = 'INSERT INTO timeCard (user_id, activity_id, activity_date, duration, description) VALUES (?, ?, ?, ?, ?)'

    db.run(query, req.currentUserId, timeCard.activityId, timeCard.date, timeCard.duration, timeCard.description, err => {
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      res.end()
    })
  })

  return router
}

module.exports = {
  buildTimeCardsRouter
}
