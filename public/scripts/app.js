/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // get the map(s) which belong to a person (owner_id)
  // forEach map_id {
    //load a blank map(s)
  // query markers that belong to a person's map (map_id)
  // forEach marker_id make a marker on the map
  //}

  const loadMarkers = function () {
    $.ajax({
      url: "http://localhost:8080/maps/:id/latlng",
      method: "GET",
    }).then(function (e) {
      window.mapHelpers.onLocationFound
    });
  };


  const createMapElement = function (tweetObj) {
    const creationDate = new Date(tweetObj.created_at).toISOString();

    const article = `
    <article class="tweet">
    <header>
                <figure>
                  <img src=${tweetObj.user.avatars}>
                  <figcaption>${tweetObj.user.name}</figcaption>
                </figure>

                <a href="">${tweetObj.user.handle}</a>
              </header>
              <p></p>
              <footer>
                <h6>Created <time class="timeago" datetime="${creationDate}"></time></h6>
                <div class="socials">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>

              </footer>
              </article>
    `;

    let $tweet = $(article);

    //Protect against cross site scripting
    $tweet.find("p").text(tweetObj.content.text);
    return $tweet;
  };

  const renderTweets = function (tweetObjects) {
    const onLocationFound = function(e) {
  console.log(e)
  const radius = e.accuracy / 2;

  // L.marker(e.latlng, {icon: greenIcon} ).addTo(mymap)
  L.marker(e.latlng ).addTo(mymap)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(mymap).bindPopup('You are here');

  for (let m in userMarkers) {
    console.log("---------LOOP STARTS---------")
  // addMarker({latlng: {lat: 45.411406096232525, lng: -75.68974971771242}})
  addMarker({latlng: userMarkers[m]})
  }

}

    tweetObjects.forEach(function (obj) {
      let $tweet = createTweetElement(obj);
      $("#tweet-section").append($tweet);
      $("time.timeago").timeago();
    });
  };



  loadTweets();
});
