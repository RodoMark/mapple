# HTTP method/Verb      |   URL path              |   Use/Purpose 

# GET

* GET                 /maps                       Shows some available interests 
* GET                 /maps/:query                Shows specific interest with query
* GET                 /map/:id                    Shows map with specific id
* GET                 /map/:id/edit               Shows map checks if user owns map, loads editor if true, (unauthorized request, OR loads map with :id if  false ... we have to decide on this)
* GET                 /login                      Loads login page
* GET                 /register                   Loads registration page
* GET                 /profile/id                 Loads user's profile page with favourites and maps they've created

# POST

* POST                /login                      Verifies user with email and grants authentication cookie
* POST                /register                   Verifies if user is unique and grants authentication cookie
* POST                /map/create                 Creates a new blank map template with a unique id and redirects to GET map/:id  
* POST                /map/:id/edit               Verifies if user is authenticated and edits the map
* POST                /map/:id/marker/:id/edit    Verifies if user is authenticated and edits the marker
* POST                /map/:id/marker/:id/delete  Verifies if user is authenticated and edits the marker
* POST                /map/:id/like               Verifies if user is authenticated and adds map to user's favourites
* POST                /map/:id/delete             Verifies if user is authenticated and removes map from user's created maps



