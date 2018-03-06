const http = require('http')
const url = require('url')
const sqlite3 = require('sqlite3')
const fs = require('fs')

const myActivities = new sqlite3.Database("activitiesDB.db")
console.log("Successfully opened the database.")

function getActivities(req, res) {
  myActivities.all("SELECT * FROM activity;", (err, rows) => {
    if (err) {
      res.statusCode = 500
      res.end('Database error.')
      return
    }

    res.end(JSON.stringify(rows))
  })
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  switch (pathname) {
    case '/activities':
      getActivities(req, res)
    break

    case '/':
      fs.readFile('./client/index.html', 'utf8', function(err, contents) {
        if (err) {
          res.statusCode = 500
          res.end('File not found.')
          return
        }

        res.end(contents)
      })
    break

    case '/app.js':
      fs.readFile('./client/app.js', 'utf8', function(err, contents) {
        if (err) {
          res.statusCode = 500
          res.end('File not found.')
          return
        }

        res.end(contents)
      })
    break

    default:
      res.statusCode = 404
      res.end('Page not found.')
    break
  }

}).listen(8080)
