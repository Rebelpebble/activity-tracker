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
  // First you create a URL object.
  // Then you parse the incoming url of the request sent in.
  // Then you set the path name to the pathname property of the URL object.
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

        // Serves the data in the html file to the client as plain text, and the browser, by default,
        // will interpret the text as html.
        // Note, with only this case, the server does not have access to the app.js file that is referenced
        // in the html file. See below.
        res.end(contents)
      })
    break

    // The html file will actually go looking for the app.js file by sending an additional request to the server.
    // This additional request has a path name which we handle below.
    case '/app.js':
      fs.readFile('./client/app.js', 'utf8', function(err, contents) {
        if (err) {
          res.statusCode = 500
          res.end('File not found.')
          return
        }

        res.end(contents) // Serves the .js file so that it can be used by the front end.
      })
    break

    default:
      res.statusCode = 404
      res.end('Page not found.')
    break
  }

}).listen(8080)
