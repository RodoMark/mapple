$(document).ready(function () {
  console.log("Marker Form: ready...")

  // GET THE ELEMENT WHICH IS THE MARKER
  // WHEN YOU PRESS EDIT REPLACE THE FORM WITH INPUT FIELDS INSTEAD OF TEXT FIELDS
  // WHEN YOU PRESS SUBMIT REPLACE THE MARKER FORM WITH TEXT FIELDS AGAIN

  const $edit = $('#mapid').parents().find('button.edit-btn')
  const $marker = $('#mapid').parents().find('div.edit-btn')

  $edit.on('click', function(e){
    e.preventDefault()

    console.log("edit clicked")
    $marker.toggle()

  })

});

