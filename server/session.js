const generateUUID = require('uuid/v4')
const express = require('express')

function buildSessionsRouter(db) {
  const router = express.Router()

  router.post('/sessions', (req, res) => {
    const user = req.body // the user posts (username, password) from the front end upon login
    const query = `SELECT * FROM user WHERE username = ?` // query created to select user from user table to find its associated password in the database

    db.all(query, user.username, (err, rows) => { // query ran using username to find the associated password in the database
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      if (rows.length === 0) { // check is to see if the user even exists in the database. if the user submitted doesn't pop up, then the wrong UN was used
        res.status(400).json({ message: 'Username does not exist.' })
        return
      }

      if (user.password !== rows[0].password) { // checks to see if the password submitted by the front end is the same as the password stored in the DB
        res.status(400).json({ message: 'Incorrect password.' })
        return
      }

      // Now have successfully logged in at this point.
      createSession(rows[0].id, db, (err, token) => { // now that the user has been verified, a session needs to be created. a UN with associated token needs to go in the session table
        if (err) {
          res.status(500).json({ message: 'Database error', err})
        }

        res.cookie('session', token) // after the user-token relation is created in the db, the browser is given a token with the property 'session'
        res.end()
      })
    })
  })

  return router
}

function createSession(userId, db, callback) {
  const token = generateUUID() // generates a unique string that the browser can then store

  db.run('INSERT INTO session (user_id, token) VALUES (?, ?);', userId, token, err => { // creates relationship between the user and the token. these values can be used to validate if they are logged in
    if (err) {
      callback(err) // finished the response with just an error and no token
      return
    }

    callback(null, token) // gives a 'no-error' with null, and delivers the token to be sent to the browser
  })
}

module.exports = {
  buildSessionsRouter
}
