const express = require('express')

function buildActivitiesRouter(db) {
  const router = express.Router()

  router.get('/activities', (req, res) => {
    const query = 'SELECT * FROM activity WHERE user_id = ? ORDER BY name ASC;'

    db.all(query, req.currentUserId, (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      res.json(rows)
    })
  })

  router.post('/activities', (req, res) => {
    const activity = req.body

    db.run('INSERT INTO activity (user_id, name) VALUES (?, ?);', req.currentUserId, activity.name, err => {
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

  return router
}

module.exports = {
  buildActivitiesRouter
}
