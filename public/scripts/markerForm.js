$(document).ready(function () {
  console.log("Marker Form: ready...")

  const $marker = $('leaflet-popup-content').parent().find()
  const $edit = $('.edit-btn')

  $edit.on('click', function(e){
    e.preventDefault()

    console.log("edit clicked")
    $marker.empty()

  })

});

