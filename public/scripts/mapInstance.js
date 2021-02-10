// render map with starting lat and lng and zoom from user
//


$(document).ready(function () {

  const map_id = 1

  const mapContent = `<div data-map-id="${map_id} id="mapid" class="map"></div>`

  const generateMap = function(map_id) {
    $('body').append(mapContent)
  }



  const mapObj = {
    id: 1,
    owner_id: 1,
    title: "THE TITLE",
    description: "",
    lat_start: 45.407031,
    lng_start: -75.690927,
     zoom: 13
   }

  const initializeMap = function(mapObj) {
    generateMap(mapObj.id)

    return L.map('mapid').setView([mapObj.lat_start, mapObj.lng_start], mapObj.zoom);
  }

  const mymap = initializeMap(mapObj)

  const markerObj = {
    "marker_id":1,
    "map_id":1,
    "lat":"45.39603920754866",
    "lng":"-75.67670345306398",
    "title":"THIS IS THE NEW MARKER",
    "description":"Description",
    "created_at":null,
  }


  const getPopupContent = function(markerObj) {

    const popup =
    `
    <form data-marker-id="${markerObj.marker_id}" id="submit-marker" action="/maps/${markerObj.map_id}/markers" method="POST">
    <label for="title">Title: </label>
    <input name="title"></input><br>
    <label for="description">Description: </label>
    <input name="description"></input><br>

    <button class="submit-btn" type="submit">Submit</button><br>

    </form>

    <form method="POST" action="/maps/${markerObj.map_id}/markers/${markerObj.marker_id}/delete">
    <button class="delete-btn">DELETE MARKER</button>
    </form>
    `

    return popup
  }



  const openPopUp = function () {

  }


    const clearMarker = function(id) {
      console.log(markers)
      let new_markers = []
      markers.forEach(function(marker) {
        if (marker.id === id) mymap.removeLayer(marker)
        else new_markers.push(marker)
      })
      markers = new_markers
    }








const bindPopUp = function() {
  // Give every marker that is populated a popup
  // Popup should contain a title and a description
  // It should also contain a delete button
  // The delete button should DELETE.maps/:map_id/markers/:marker_id
}

const populateMarkers = function(markerArr) {


  for (const m of markerArr) {
    let mp = L.marker([m.lat, m.lng]).addTo(mymap)
    mp.bindPopup(getPopupContent(m), {
      closeButton: false
    });

  }
}

$.ajax({
  url: `/maps/${map_id}/points`,
  method: 'GET'
}).then(output => {
  populateMarkers(output)
});



const putMarker = function(markerObj) {
  // How do we communicate the map ID in the PUT form?
  $.ajax({
    url: `/maps/${markerObj["map_id"]}/markers/`,
    method: 'POST'
  }).then( output => {
    debugger
    location.reload()
  })
}


const insertMark = function() {
  putMarker()
  $('submit-btn').on('click', putMarker(markerObj))
}


const onMapClick = function(e) {
let mp = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
const markerInputPopUp = `
<form data-marker-id="${markerObj.marker_id}" id="submit-marker" action="/maps/${markerObj.map_id}/markers" method="POST">
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


      console.log("MP LATLNG", mp._latlng)
      console.log("lat", e.latlng.lat)
      console.log("long", e.latlng.lng)

      mp.bindPopup(markerInputPopUp, {
        closeButton: false
      });
}

mymap.on('click', onMapClick);

const marker_id = 7

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

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFja2lzb24iLCJhIjoiY2trdTN4M3FvMHBhdzJwbjB2bWFua2RwNSJ9.66BkZT9vhAC042qQSiQdiA'
}).addTo(mymap);

// latlng: m1 ----> {latlng: {lat: x, lng: y}}







const onLocationError = function(e) {
  alert(e.message);
}




// mymap.on('locationfound', onLocationFound);
// mymap.on('locationerror', onLocationError);
// mymap.on('click', onMapClick);

// mymap.locate({setView: true, maxZoom: 16});
// mymap.locate({watch:true});


// polygon1.bindPopup("I am a polygon.");
// marker1.bindPopup('You are here');
// circle1.bindPopup("Here is a circle");


});

