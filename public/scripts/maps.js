const mymap = L.map('mapid').setView([45.407031, -75.690927], 13);
// const mymap = L.map('mapid').fitWorld();
const popup = L.popup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFja2lzb24iLCJhIjoiY2trdTN4M3FvMHBhdzJwbjB2bWFua2RwNSJ9.66BkZT9vhAC042qQSiQdiA'
}).addTo(mymap);

const marker1 = L.marker([45.40764, -75.695393]).addTo(mymap);

const circle1 = L.circle([45.40764, -75.695393], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 200
}).addTo(mymap);

const polygon1 = L.polygon([
  [45.408815, -75.730648],
  [45.399053, -75.748672],
  [45.406646, -75.717087]
]).addTo(mymap);

// alert pop up

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// mymap.on('click', onMapClick);

function addMarker(e) {
  const mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
}


function onLocationFound(e) {

  console.log(e)
  const radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(mymap)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
  alert(e.message);
}

function onMapClick(e) {
  popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);

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


polygon1.bindPopup("I am a polygon.");
marker1.bindPopup('You are here');
circle1.bindPopup("Here is a circle");







