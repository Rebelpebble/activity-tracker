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
      document.location.replace('/');
    })
    .fail((xhr) => {
      console.log('Error sending data to server.', xhr.responseText)
    })
}

function logout() {
  $.get('/logout')
    .done(
      document.location.replace('/login.html')
    )
    .fail(xhr => {
      console.log('Error logging out.', xhr.responseText)
    })
}
