function buildSessionCheckMiddleware(db) { // middleware created to check if a user has a session open (i.e. logged in)
  return (req, res, next) => {
    if (!req.cookies.session) { // checks if there is a cookie in the header, if not, the no user could be logged in
      res.status(401).end('Session cookie is required.')
      return
    }

    const token = req.cookies.session // gets cookie from the request header. (a logger in user should have one from logging in)
    const query = 'SELECT user_id FROM session WHERE token = ?'

    db.all(query, token, (err, rows) => { // selects the user_id with the token that is given by the browser
      if (err) {
        res.status(500).json({ message: 'Database error.', err })
        return
      }

      if (rows.length === 0) { // if no user has the token given by the web browser, then the cookie must be invalid, because it is not associated with a login
        res.status(401).end('Invalid session.')
        return
      }

      req.currentUserId = rows[0].user_id // sets a header with the property currentUserId using the results of the query against the token from the browser
      next() // the user is validated by the backend that they are logged in, and they have the currentUserId available in a header to be used by the front end
    })
  }
}

module.exports = {
  buildSessionCheckMiddleware
}
