const mymap = L.map('mapid').setView([45.407031, -75.690927], 13);
// const mymap = L.map('mapid').fitWorld();
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

// const marker1 = L.marker([45.40764, -75.695393]).addTo(mymap);
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



function addMarker(e) {
  let mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

  let id;
  if (markers.length < 1) {
    id = 0
  } else {
  id = markers[markers.length - 1]._id + 1
  }
  const popupContent =
    '<p>Some Infomation</p></br>' +
    '<p>This is a test</p></br>' +
    '<button onclick="clearMarker(' + id + ')">Delete</button>';

    mp._id = id
    mp.bindPopup(popupContent, {
      closeButton: false
    });
    mymap.addLayer(mp)
    markers.push(mp)
}

function clearMarker(id) {
	console.log(markers)
  let new_markers = []
  markers.forEach(function(marker) {
    if (marker._id === id) mymap.removeLayer(marker)
    else new_markers.push(marker)
  })
  markers = new_markers
}


function onLocationFound(e) {
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

function onLocationError(e) {
  alert(e.message);
}

function onMapClick(e) {
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





