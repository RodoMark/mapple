$(document).ready(function () {
  console.log("mapsShow: ready...")
  $.ajax({
    url: `/maps/search/:interestName`,
    method: 'GET'
  })


});
