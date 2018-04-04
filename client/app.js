$(document).ready(function(){

})

function submitCredentials() {
  const credentials = $('form').serializeArray()
  const credentialsRaw = {}

  credentials.forEach(item => {
    credentialsRaw[item.name] = item.value
  })

  $.post({
    url: '/session',
    data: JSON.stringify(credentialsRaw),
    headers: {
      'content-type': 'application/json'
    }
  })
    .done(() => {
      // TODO: What do?
    })
    .fail((xhr) => {
      console.log('Error sending data to server.', xhr.responseText)
    })
}
