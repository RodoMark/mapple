// render map with starting lat and lng and zoom from user
//


$(document).ready(function () {


const map_id = 1

const details = {
 lat_start: 45.407031,
 lng_start: -75.690927,
  zoom: 13
}

const mymap = L.map('mapid').setView([details.lat_start, details.lng_start], details.zoom);



const populateMarkers = function(arr) {
  for (const m of arr) {
    L.marker([m.lat, m.lng]).addTo(mymap)
  }
}

$.ajax({
  url: `/maps/${map_id}/points`,
  method: 'GET'
}).then(output => {
  populateMarkers(output)
});

const addMarker = function() {
  $.ajax({
    url: 'maps/$map_id/marker/$marker_id/',
    method: 'PUT'
  }).then( output => {
    location.reload()
  }
    
  )
}

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

$('#delete-btn').on('click', removeMarker)


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





// const onLocationFound = function(e) {
//   console.log(e)
//   const radius = e.accuracy / 2;

//   // L.marker(e.latlng, {icon: greenIcon} ).addTo(mymap)
//   L.marker(e.latlng ).addTo(mymap)
//     .bindPopup("You are within " + radius + " meters from this point").openPopup();

//   L.circle(e.latlng, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 200
//   }).addTo(mymap).bindPopup('You are here');



// }




const onLocationError = function(e) {
  alert(e.message);
}

const onMapClick = function (e) {
  // popup
  //     .setLatLng(e.latlng)
  //     .setContent("You clicked the map at " + e.latlng.toString())
  //     .openOn(mymap);

      console.log(e)
      console.log("lat", e.latlng.lat)
      console.log("long", e.latlng.lng)
  addMarker(e)
}



// mymap.on('locationfound', onLocationFound);
// mymap.on('locationerror', onLocationError);
mymap.on('click', onMapClick);

// mymap.locate({setView: true, maxZoom: 16});
// mymap.locate({watch:true});


// polygon1.bindPopup("I am a polygon.");
// marker1.bindPopup('You are here');
// circle1.bindPopup("Here is a circle");


});

