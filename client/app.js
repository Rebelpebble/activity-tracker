const myActivities = [
  {
    id: 1,
    name: 'guitar'
  }, {
    id: 2,
    name: 'program'
  }
]

const myJSONString = JSON.stringify(myActivities)
const myActivitiesObject = JSON.parse(myJSONString)

window.onload = function() {
  const activitiesElement = document.getElementById('activities')

  myActivitiesObject.forEach(activity => {
    const newElement = document.createElement('li') // <li> </li>
    newElement.innerText = activity.name // <li>Some Name</li>
    activitiesElement.appendChild(newElement) // Appends the list item to the <ul>
  })
}
