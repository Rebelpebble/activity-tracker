$(document).ready(function(){
   populateDropDown()
})

function submitTime() {
  const timeCardNameValuePairs = $('form').serializeArray()
  const timeCardRaw = {}

  timeCardNameValuePairs.forEach(item => {
    timeCardRaw[item.name] = item.value
  })

  // Copies timeCardRaw, then overides the values for activityId and duration in the new timeCard object
  const timeCard = {
    ...timeCardRaw,
    activityId: parseInt(timeCardRaw.activityId),
    duration: parseInt(timeCardRaw.duration)
  }

  $.post({
    url: '/postTime',
    data: JSON.stringify(timeCard),
    headers: {
      'content-type': 'application/json'
    }
  })
    .done(() => {
      // TODO Add a list of time cards and have it refreshed here.
    })
    .fail((xhr) => {
      console.log('Error sending data to server.', xhr.responseText)
    })
}

function populateDropDown() {
  const dropDownElement = $('#dropDown')

  $.get('/activities')
    .done(activities => {
      activities.forEach(activity => {
        const dropDownItem = $('<option></option>').append(activity.name)
        dropDownItem.val(activity.id)
        dropDownElement.append(dropDownItem)
      })
    })
    .fail(xhr => {
      console.log('Error loading activities.', xhr.responseText)
    })
}
