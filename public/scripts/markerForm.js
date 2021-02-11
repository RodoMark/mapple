$(document).ready(function () {
  console.log("Marker Form: ready...")

  const $edit = $('#mapid').parents().find('button.edit-btn')
  const $marker = $('#mapid').parents().find('div.edit-btn')

  $edit.on('click', function(e){
    e.preventDefault()

    console.log("edit clicked")
    $marker.toggle()

  })

});

