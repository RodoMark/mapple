$(document).ready(function () {
  console.log('mapsShow.js READY')


  $('#searchBtnNav').on('click',function(e) {
    // e.preventDefault

    let value = $('#searchNav').val()
    console.log("VALUE:", value)

    window.location = `/maps/search/${value}`

  })

});
