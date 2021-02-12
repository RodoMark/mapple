// render map with starting lat and lng and zoom from user
//
$(document).ready(function () {

  // Gets the map id from the req params
  let $map = $("[class*=data-map-id]")[0].classList[0]
  let map_id = $map[$map.length-1]
  console.log("This map's map_id is", map_id)

  const $mapContent = $('#mapid')

  const generateMap = function(map_id) {
    $('.mapContainer').append($mapContent)
  }


  const getMapObject = function() {
    return $.ajax({
      url: `/maps/${map_id}/info`,
      method: 'GET'
    }).then(output => {

      const mapObj = {
            map_id: output.map_id,
            user_id: output.user_id,
            name: output.name,
            description: output.description || null,
            lat_start: output.lat_start,
            lng_start: output.lng_start,
            zoom: output.zoom || 10,
           }

      return mapObj

    });

  }

  const initializeMap = function(mapObj) {
    generateMap(mapObj.map_id)
    return L.map('mapid').setView([mapObj.lat_start, mapObj.lng_start], mapObj.zoom);
  }



 const mapObj = getMapObject()
  .then(mapObj => {

    const mymap = initializeMap(mapObj)


  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFja2lzb24iLCJhIjoiY2trdTN4M3FvMHBhdzJwbjB2bWFua2RwNSJ9.66BkZT9vhAC042qQSiQdiA'
}).addTo(mymap);

    $.ajax({
      url: `/maps/${map_id}/points`,
      method: 'GET'
    }).then(output => {
      populateMarkers(output,mymap)
    });

    const onMapClick = function(e) {
      let mp = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
      const markerInputPopUp = `
      <form data-marker-id="${mp._leaflet_id}" id="submit-marker" action="/maps/${map_id}/markers" method="POST">
      <label for="title">Title: </label>
      <input name="title"></input><br>
      <label for="description">Description: </label>
      <input name="description"></input><br>
      <input type="hidden" name="lat" value="${e.latlng.lat}"/>
      <input type="hidden" name="lng" value="${e.latlng.lng}"/>
      <button class="submit-btn" type="submit">Submit</button><br>
      <button class="delete-btn">DELETE MARKER</button>
      </form>
      `
            console.log("lat", e.latlng.lat)
            console.log("long", e.latlng.lng)
            mp.bindPopup(markerInputPopUp, {
              closeButton: true
            });
      }

      mymap.on('click', onMapClick);
 }
 )


  // const getPopupContent = function(markerObj) {
  //   const popup =
  //   `
  //   <p>${markerObj.title}</p>
  //   <p>${markerObj.description}</p>
  //   <button class="edit-btn" id="edit-btn-${markerObj.marker_id}">EDIT</button>
  //   `
  //   return popup
  // }

  const getPopupContent = function(markerObj) {
    const $popup =
    $(`<div>
    <p>${markerObj.title}</p>
    <p>${markerObj.description}</p>
    <button class="edit-btn" id="edit-btn-${markerObj.marker_id}">EDIT</button>
    </div>`)
    $('.edit-btn', $popup).on('click', function() {

      $popup.empty()
      $popup.html(`<form  id="submit-marker" action="/maps/${map_id}/markers/edit/${markerObj.marker_id}" method="POST">
        <label for="title">Title: </label>
        <input name="title"></input><br>
        <label for="description">Description: </label>
        <input name="description"></input><br>
        <button class="submit-btn" type="submit">Submit</button><br>
        <button class="delete-btn" id="delete-btn-${markerObj.marker_id}">DELETE MARKER</button>

        </form>`
      )
      $('.delete-btn', $popup).on('click', function() {
        console.log('DELETE BUTTON CLICKED --------->')
        $.ajax({
          url: `/maps/${map_id}/markers/${markerObj.marker_id}/delete`,
          method: 'POST'
        }).then(output => {
          console.log(output)
        });
      })

    })
    return $popup[0]
  }


const populateMarkers = function(markerArr, mymap) {
  console.log("MARKER ARRAY------>", markerArr)
  for (const m of markerArr) {
    console.log(m.marker_id)
    let mp = L.marker([m.lat, m.lng]).addTo(mymap)
    mp.bindPopup(getPopupContent(m), {
      closeButton: true
    });
    mp.on('click', function() {
      const $editBtn = $($('.edit-btn')[0]);
      console.log($editBtn);
      $editBtn.on('click', function(){
      console.log('EDIT BUTTON CLICKED---------->');

      })
    })

  }
}



const putMarker = function(markerObj) {
  $.ajax({
    url: `/maps/${markerObj["map_id"]}/markers/`,
    method: 'POST'
  }).then( output => {
    location.reload()
  })
}

const insertMarker = function() {
  putMarker(markerObj)
  $('submit-btn').on('click', putMarker(markerObj))
}





const removeMarker = function() {
  $.ajax({
    url: `/maps/${map_id}/markers/${marker_id}`,
    method: 'DELETE'
  }).then(output => {
    location.reload()
    }
  )
}
$('delete-btn').on('click', removeMarker)
const popup = L.popup();
// create an array to store markers in for addMarker and clearMarker
let markers = []


const onLocationError = function(e) {
  alert(e.message);
}

});
