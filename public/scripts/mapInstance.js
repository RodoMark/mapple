// render map with starting lat and lng and zoom from user
//
$(document).ready(function () {
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
      console.log("MAPOBJ INSIDE OF FUNCTION", mapObj)
      return mapObj
    });
  }
  const initializeMap = function(mapObj) {
    generateMap(mapObj.map_id)
    return L.map('mapid').setView([mapObj.lat_start, mapObj.lng_start], mapObj.zoom);
  }
  const getMapID = function() {
  // Use jquery to get the map_id from <div id="mymap">
  // it's <%= map_id %> in the class class data-map-id-<%= map_id %>
  return map_id
  }
  // let map_id = getMapID()
  let $map = $("[class*=data-map-id]")[0].classList[0]
  let map_id = $map[$map.length-1]
  console.log("This map's map_id is", map_id)
  const $mapContent = $('#mapid')
  const generateMap = function(map_id) {
    $('.mapContainer').append($mapContent)
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
      <form data-marker-id="${mp._leaflet_id}" id="submit-marker" action="/maps/${1}/markers" method="POST">
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
              closeButton: false
            });
      }
      mymap.on('click', onMapClick);
 }
 )
  // const markerObj = {
  //   "marker_id":1,
  //   "map_id":1,
  //   "lat":"45.39603920754866",
  //   "lng":"-75.67670345306398",
  //   "title":"THIS IS THE NEW MARKER",
  //   "description":"Description",
  //   "created_at":null,
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
      $popup.html(
        `
        <form  id="submit-marker" action="/maps/${1}/markers" method="POST">
        <label for="title">Title: </label>
        <input name="title"></input><br>
        <label for="description">Description: </label>
        <input name="description"></input><br>
        <button class="submit-btn" type="submit">Submit</button><br>
        <button class="delete-btn">DELETE MARKER</button>
        </form>
        `

      )
    })
    return $popup[0]
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
const populateMarkers = function(markerArr, mymap) {
  console.log("MARKER ARRAY------>", markerArr)
  for (const m of markerArr) {
    console.log(m.marker_id)
    let mp = L.marker([m.lat, m.lng]).addTo(mymap)
    mp.bindPopup(getPopupContent(m), {
      closeButton: false
    });
    // mp.on('click', function() {
    //   const $editBtn = $($('.edit-btn')[0]);
    //   console.log($editBtn);
    //   $editBtn.on('click', function(){
    //   console.log('EDIT BUTTON CLICKED---------->');
    //   })
    // })
  }
}
const putMarker = function(markerObj) {
  // How do we communicate the map ID in the PUT form?
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
