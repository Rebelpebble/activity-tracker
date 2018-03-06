const http = require('http')
const url = require('url')
const sqlite3 = require('sqlite3')

const myActivities = new sqlite3.Database("activitiesDB.db")
console.log("Successfully opened the database.")

function getActivities(req, res) {
  myActivities.all("SELECT * FROM activity;", (err, rows) => {
    if (err) {
      res.statusCode = 500
      res.end('Database error.')
    }

    res.end(JSON.stringify(rows))
  })
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  switch (pathname) {
    case '/hello':
      res.end('Hello World')
    break

    case '/activities':
      getActivities(req, res)
    break

    default:
      res.statusCode = 404
      res.end('Page not found.')
    break
  }

}).listen(8080)
