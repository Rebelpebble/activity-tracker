$(document).ready(function(){
   populateDropDown()
   createTimeCardTable()
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
      location.reload()
    })
    .fail((xhr) => {
      console.log('Error sending data to server.', xhr.responseText)
    })
}

function populateDropDown() {
  const dropDownElement = $('#dropDown')

  $.get('/activities')
    .done(activities => {
      console.log(activities)
      activities.sort().forEach(activity => {
        const dropDownItem = $('<option></option>').append(activity.name)
        dropDownItem.val(activity.id)
        dropDownElement.append(dropDownItem)
      })
    })
    .fail(xhr => {
      console.log('Error loading activities.', xhr.responseText)
    })
}

function createTimeCardTable() {
  $.get('/timeCards')
    .done(timeCards => {
      const timeCardTable = $('#timeCardTable')

      timeCards.reverse().forEach( row => {
        const newRow = $('<tr></tr>') // Create new html row.

        for (var property in row) {
          const newCell = $('<th></th>') // Create empty html cell
          newCell.append(row[property]) // Insert cell-value into html cell
          newRow.append(newCell) // Insert html cell into html row
        }

        timeCardTable.append(newRow) // Insert html row into table.
      })

    })
    .fail(xhr => {
      console.log('Error loading time cards.', xhr.responseText)
    })
}
