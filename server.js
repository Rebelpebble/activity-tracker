const http = require('http')
const url = require('url')
const bs3 = require('better-sqlite3')
//const sqlite3 = require('sqlite3')

const database = new bs3('activitiesDB.db')
console.log("Successfully opened the database.")

const query = database.prepare('SELECT * FROM activity;')
const queryResults = query.all()
console.log(queryResults)


/*
const myActivities = new sqlite3.Database("activitiesDB.db")
console.log("Successfully opened the database.")

myActivities.all("SELECT * FROM activity;", function(err, rows) {
  if (err) {
    console.log(err)
  }

  query = JSON.stringify(rows)
})
*/

//const serverContent = [{"id" : 1, "name" : "Program"}, {"id" : 2, "name" : "Guitar"}]

const server = http.createServer(function(req,res){
  const pathname = url.parse(req.url).pathname
  switch(pathname){
      case '/hello':
        res.end('Hello World')
      break

      case '/item':
        res.end(JSON.stringify(queryResults))
      break

      default:
        res.end('Default')
      break
  }

}).listen(8080)
