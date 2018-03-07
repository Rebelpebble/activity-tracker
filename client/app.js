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
  const activitiesElement = document.getElementById('activities') // This is the <ul> from html

  myActivitiesObject.forEach(activity => {
    const newElement = document.createElement('li') // Creeates generic <li> </li> floating in space, not attached to anything.
    newElement.innerText = activity.name // <li>Some Name</li> Inserts the name from myActvities as the inner text.
    activitiesElement.appendChild(newElement) // Appends the list item to the <ul>
  })
}
