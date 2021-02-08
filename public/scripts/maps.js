// const mymap = L.map('mapid').setView([45.407031, -75.690927], 13);
const mymap = L.map('mapid').fitWorld();
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

const userMarkers = {
  m1: [
    43.8399130020632,
    -79.40664768218996
  ],

  m2: [
    43.8399130020532,
    -79.40664768218996
    ],

  m3: [
    43.8399130020789,
    -79.40664768218996
  ],
}

L.marker(userMarkers.m1).addTo(mymap);
L.marker(userMarkers.m2).addTo(mymap);
L.marker(userMarkers.m3).addTo(mymap);
// const marker2 = L.marker([46.40764, -70.695393]).addTo(mymap);

// const circle1 = L.circle([45.40764, -75.695393], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 200
// }).addTo(mymap);

// const polygon1 = L.polygon([
//   [45.408815, -75.730648],
//   [45.399053, -75.748672],
//   [45.406646, -75.717087]
// ]).addTo(mymap);



const renderMap = function(userMarkers) {
  for (const key in userMarkers) {
    // click on a specific spot on the screen
    // or somehow else add using addMarker()
    // let lat = key[0]
    // let lng = key[1]
    let output = L.marker(userMarkers[key]).addTo(mymap);
    console.log(output)
  }
 return output
}

// we need to be able to use render map to get a bunch of points already saved. then, we need to
// modify that funtion to access the database, and have it still work.
const addMarker = function (e) {

let mp = renderMap()

mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

  let id;
  if (markers.length < 1) {
    id = 0
  } else {
  id = markers[markers.length - 1].id + 1
  }
  const popupContent =
    '<p>Some Infomation</p></br>' +
    '<p>This is a test</p></br>' +
    '<button onclick="clearMarker(' + id + ')">Delete</button>';

    mp.id = id
    mp.bindPopup(popupContent, {
      closeButton: false
    });
    mymap.addLayer(mp)
    markers.push(mp)
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


const onLocationFound = function(e) {
  console.log(e)
  const radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(mymap)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(mymap).bindPopup('You are here');
}

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



mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);
mymap.on('click', onMapClick);

// mymap.locate({setView: true, maxZoom: 16});
mymap.locate({watch:true});


// polygon1.bindPopup("I am a polygon.");
// marker1.bindPopup('You are here');
// circle1.bindPopup("Here is a circle");





