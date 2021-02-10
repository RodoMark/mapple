// render map with starting lat and lng and zoom from user
//


$(document).ready(function () {



  const openPopUp = function () {

  }

  // const addMarker = function (e) {
  //   console.log("addMArker", e);
  //   // {{latlng: {lat: 45.411406096232525, lng: -75.68974971771242}}
  //   mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

  //     let id;
  //     if (markers.length < 1) {
  //       id = 0
  //     } else {
  //     id = markers[markers.length - 1].id + 1
  //     }

  //     const popupContent =
  //       '<p>Some Infomation</p></br>' +
  //       '<p>This is a test</p></br>' +
  //       '<button onclick="clearMarker(' + id + ')">Delete</button>';

  //       mp.id = id
  //       mp.bindPopup(popupContent, {
  //         closeButton: false
  //       });
  //       mymap.addLayer(mp)
  //       markers.push(mp)
  //   }

    const clearMarker = function(id) {
      console.log(markers)
      let new_markers = []
      markers.forEach(function(marker) {
        if (marker.id === id) mymap.removeLayer(marker)
        else new_markers.push(marker)
      })
      markers = new_markers
    }



const map_id = 1

const details = {
 lat_start: 45.407031,
 lng_start: -75.690927,
  zoom: 13
}

const mymap = L.map('mapid').setView([details.lat_start, details.lng_start], details.zoom);


const bindPopUp = function() {
  // Give every marker that is populated a popup
  // Popup should contain a title and a description
  // It should also contain a delete button
  // The delete button should DELETE.maps/:map_id/markers/:marker_id
}

const populateMarkers = function(arr) {
  const popupContent =
  `
  <form id="submit-marker" action="/maps/:map_id/markers/add" method="PUT">
  <label for="title">Title: </label>
  <input name="title"></input>
  <label for="description">Description: </label>
  <input name="description"></input>

  <button type=submit>Submit</button>
  </form>
  `

  for (const m of arr) {
    let mp = L.marker([m.lat, m.lng]).addTo(mymap)
    mp.bindPopup(popupContent, {
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

const addMarker = function() {
  $.ajax({
    url: `/maps/${map_id}/marker/`,
    method: 'PUT'
  }).then( output => {
    location.reload()
  })
}

function onMapClick(e) {

      console.log("lat", e.latlng.lat)
      console.log("long", e.latlng.lng)
  addMarker(e)
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




// mymap.on('locationfound', onLocationFound);
// mymap.on('locationerror', onLocationError);
// mymap.on('click', onMapClick);

// mymap.locate({setView: true, maxZoom: 16});
// mymap.locate({watch:true});


// polygon1.bindPopup("I am a polygon.");
// marker1.bindPopup('You are here');
// circle1.bindPopup("Here is a circle");


});

