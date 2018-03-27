const generateUUID = require('uuid/v4')

function sessionRoutes(app, db) {
  app.post('/session', (req, res) => {
    const user = req.body // (username, password)
    const query = `SELECT * FROM user WHERE username = ?`
    db.all(query, user.username, (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      if (rows.length === 0) {
        res.status(400).json({ message: 'Username does not exist.' })
        return
      }

      if (user.password !== rows[0].password) {
        res.status(400).json({ message: 'Incorrect password.' })
        return
      }

      // Now have successfully logged in at this point.
      createSession(rows[0].user_id, db, (err, token) => {
        res.cookie('session', token)
        res.end()
      })
    })
  })
}

function createSession(userId, db, callback) {
  const token = generateUUID()
  db.run('INSERT INTO session (user_id, token) VALUES (?, ?);', userId, token, err => {
    if (err) {
      callback(err)
      return
    }

    callback(null, token)
  })
}

module.exports = {
  sessionRoutes
}
