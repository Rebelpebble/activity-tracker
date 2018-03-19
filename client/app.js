window.onload = function() {
  loadActivities()
}

function renderActivities(activities) {
  const activitiesElement = document.getElementById('activities') // This is the <ul> from html
  activitiesElement.innerHTML = ""

  activities.forEach(activity => {
    const newElement = document.createElement('li') // Creeates generic <li> </li> floating in space, not attached to anything.
    newElement.innerText = activity.name // <li>Some Name</li> Inserts the name from myActvities as the inner text.
    activitiesElement.appendChild(newElement) // Appends the list item to the <ul>
  })
}

function loadActivities() {
  httpGetJSON("/activities", function(err, data) {
    if (err) {
      // TODO Show error to user.
      console.log("Error accessing database.")
      return
    }

    renderActivities(data)
  })
}

function addActivity() {
  // Get button text
  // Request current activities
  // Check if the activity is in the database already
  // Do POST request to http server
  // Rerender activities list
  const activityNameInputElement = document.getElementById('activityNameInput')
  const newActivity = {
    name: activityNameInputElement.value // Text from input element
  }

  httpPostJSON("/activities/new", newActivity, function(err) {
    if (err) {
      // TODO Show error to user.
      console.log("Error writing to database.")
      return
    }

    loadActivities()
  })
}

function httpGetJSON(url, callback) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", function () {
    const json = this.responseText
    const data = JSON.parse(json)
    callback(null, data)
  })
  req.open("GET", url)
  req.send()
}

function httpPostJSON(url, body, callback) {
  const bodyJSON = JSON.stringify(body) // JSON object of activity
  const req = new XMLHttpRequest()
  req.addEventListener("load", function () {
    callback()
  })
  req.open("POST", url)
  req.setRequestHeader('Content-Type', 'application/json')
  req.send(bodyJSON)
}
