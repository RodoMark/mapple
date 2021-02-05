HTTP method/Verb    |   URL path           |   Use/Purpose 


* GET                 /maps                     Shows some available interests 
* GET                 /maps/:query              Shows specific interest with query
* GET                 /map/:id                  Shows map with specific id
* GET                 /map/:id/edit             Shows map checks if user owns map, loads editor if true, (unauthorized request, OR loads map with :id if false ... we have to decide on this)
* GET                 /login                    Loads login page
* GET                 /register                 Loads registration page
* GET                 /profile/id               Loads user's profile page with favourites and maps they've created


