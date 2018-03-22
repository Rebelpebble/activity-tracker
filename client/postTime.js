$(document).ready(function(){
   // Functions to run on load.
})

function submitTime() {
  console.log($('form').serializeArray())

  $.post({
    url: '/postTime',
    data: JSON.stringify($('form').serializeArray()),
    headers: {
      'content-type': 'application/json'
    }
  })
    .done(() => {
      console.log('Posted')
    })
    .fail((xhr) => {
      console.log('Error sending data to server.', xhr.responseText)
    })
}
