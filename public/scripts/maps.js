const mymap = L.map('mapid').setView([45.407031, -75.690927], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFja2lzb24iLCJhIjoiY2trdTN4M3FvMHBhdzJwbjB2bWFua2RwNSJ9.66BkZT9vhAC042qQSiQdiA'
}).addTo(mymap);


// alert pop up

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// mymap.on('click', onMapClick);

const popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);

        console.log(e)
        console.log("lat", e.latlng.lat)
        console.log("long", e.latlng.lng)
}

mymap.on('click', onMapClick);



// const map = L.map('mapid').fitWorld();

// // const mymap = L.map('mapid').setView([45.407031, -75.690927], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//   maxZoom: 18,
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1
// }).addTo(map);

// function onLocationFound(e) {
//   var radius = e.accuracy / 2;

//   L.marker(e.latlng).addTo(map)
//     .bindPopup("You are within " + radius + " meters from this point").openPopup();

//   L.circle(e.latlng, radius).addTo(map);
// }

// function onLocationError(e) {
//   alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

// map.locate({setView: true, maxZoom: 16});




