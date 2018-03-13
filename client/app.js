window.onload = function() {
  loadActivities()
}

function renderActivities(activities) {
  const activitiesElement = document.getElementById('activities') // This is the <ul> from html

  activities.forEach(activity => {
    const newElement = document.createElement('li') // Creeates generic <li> </li> floating in space, not attached to anything.
    newElement.innerText = activity.name // <li>Some Name</li> Inserts the name from myActvities as the inner text.
    activitiesElement.appendChild(newElement) // Appends the list item to the <ul>
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
