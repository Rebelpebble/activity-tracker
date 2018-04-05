$(document).ready(function(){
   loadActivities()
})

function renderActivities(activities) {
  const activitiesElement = $('#activities')
  activitiesElement.html('')

  activities.forEach(activity => {
    const listItem = $('<li></li>').append(activity.name)
    activitiesElement.append(listItem)
  })
}

function loadActivities() {
  $.get('/activities')
    .done(activities => {
      renderActivities(activities)
    })
    .fail(xhr => {
      // TODO Come up with a message to the user.
      console.log('Error loading activities.', xhr.responseText)
    })
}

function addActivity() {
  const activityNameInputElement = $('#activityNameInput')
  const newActivity = {
    name: activityNameInputElement.val(),
  }

  $.post({
    url: '/activities',
    data: JSON.stringify(newActivity),
    headers: {
      'content-type': 'application/json'
    }
  })
    .done(() => {
      loadActivities()
    })
    .fail(xhr => {
      // TODO Come up with a message to the user.
      console.log('Error sending data to server.', xhr.responseText)
    })
}
