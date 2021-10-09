var searchBtnEl = document.querySelector("#searchBtn"); 
var gRatingCheckbox = document.getElementById("gRating");
var pgRatingCheckbox = document.getElementById("pgRating");
var pg13RatingCheckbox = document.getElementById("pg13Rating");
var rRatingCheckbox = document.getElementById("rRating");
var comedy = document.getElementById("35");
var action = document.getElementById("28");
var horror = document.getElementById("27");
var romance = document.getElementById("10749");
var animation = document.getElementById("16");
var adventure = document.getElementById("12");
var crime = document.getElementById("80");
var documentary = document.getElementById("99");
var drama = document.getElementById("18");
var family = document.getElementById("10751");
var fantasy = document.getElementById("14");
var history = document.getElementById("36");
var music = document.getElementById("10402");
var scienceFiction = document.getElementById("878");
var mystery = document.getElementById("9648");
var tvMovie = document.getElementById("10770");
var thriller = document.getElementById("53");
var war = document.getElementById("10752");
var western = document.getElementById("37");
var rating = document.getElementById("ratingRange")

var apiKey = "e7f1b20f0b6095eb3bfbbb6951d074ed";
var selectedMpaaRating = "";
var selectedGenre = "";
var selectedMinRating = "";
var movieDisplay = [];
var allPages = [];


var checkMpaaRating = function(event) {
  selectedMpaaRating = "&certification_country=US";
    if (gRating.checked) {
        console.log("G rating checked");
        selectedMpaaRating += "&certification=G";
    }
    if (pgRating.checked) {
        console.log("PG rating selected");
        selectedMpaaRating += "&certification=PG";
    }
    if (pg13Rating.checked) {
        console.log("PG-13 rating selected");
        selectedMpaaRating += "&certification=PG-13";
    }
    if (rRating.checked) {
        console.log("R rating selected");
        selectedMpaaRating += "&certification=R";
    };
};

var checkGenre = function(){
  // include genres for API call
  selectedGenre = "&with_genres=";
  // create a new array that adds each genre selected.
  var genres = [];
  // check for selected genres
    if (comedy.checked) {
       genres.push('35');
    }
    if (action.checked) {
      genres.push('28')
    }
    if (horror.checked) {
      genres.push('27')
    }
    if (romance.checked) {
      genres.push('10749')
    }
    if (animation.checked) {
      genres.push('16')
    }
    if (adventure.checked) {
      genres.push('12')
    }
    if (crime.checked) {
      genres.push('80')
    }
    if (documentary.checked) {
      genres.push('99')
    }
    if (drama.checked) {
      genres.push('18')
    }
    if (family.checked) {
      genres.push('10751')
    }
    if (fantasy.checked) {
      genres.push('14')
    }
    if (history.checked) {
      genres.push('36')
    }
    if (music.checked) {
      genres.push('10402')
    }
    if (scienceFiction.checked) {
      genres.push('878')
    }
    if (mystery.checked) {
      genres.push('9648')
    }
    if (tvMovie.checked) {
      genres.push('10770')
    }
    if (thriller.checked) {
      genres.push('53')
    }
    if (war.checked) {
      genres.push('10752')
    }
    if (western.checked) {

      genres.push('37')
    }
    // join all selected genres to include in genres API call.
    genres.join(".");
    selectedGenre += genres
    console.log(selectedGenre);
};

var checkRating = function () {
  // param for average rating, minimum of 50 ratings
  selectedMinRating = "&vote_count.gte=50&vote_average.gte=" 
  // get value from rating slider and add to minimumRating var
  selectedMinRating += rating.value;
  console.log(selectedMinRating)
};


// Discover Movies
var discoverMovies = async function() {
  // check selected MPAA ratings
  checkMpaaRating();
  // check selected genres
  checkGenre();
  // check movie rating
  checkRating();
    
    var apiUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed" + selectedMpaaRating + selectedGenre + selectedMinRating;
    fetch(apiUrl).then(function(response) {
      if(response.ok) {
        // console.log(response);
        response.json().then(function(data) {
            // console.log(data);
  // loop to pull random 4 results from the data object returned.
  // need to include a loop which includes results from all pages (only 20 results show per page)
  // each page contains 3 useful fields for pagination - page, total_results, and total_pages.
  // check number of total pages, an api call is needed for each page(?)
  // ex: https://api.themoviedb.org/3/discover/movie/?api_key...&page=1
  //     https://api.themoviedb.org/3/discover/movie/?api_key...&page=2
  // Only up to page 1000 is allowed to be accessed per request.
  // api call limitation as well of 60 calls per minute i think.

            // loop to get results from all pages and store each into array allPages
            // start i = 1 since no page 0 exists
            for (i=0; i<data.total_pages; i++) {
              apiUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed" + selectedMpaaRating + selectedGenre + selectedMinRating + "&page=" + [i+1];
              fetch(apiUrl).then(function(response) {
                if(response.ok) {
                  response.json().then(function(data) {
                    // console.log(data);
                    // debugger;
                    // generate array containing results from each page in API response
                    for (i=0; i<data.results.length; i++) {
                      allPages.push(data.results[i]);
                    }
                    console.log(allPages);
                    // loop to generate 4 random movies from array containing data for all results from all pages
                    for (i=0; i<4; i++) {
                      // debugger;
                      random = Math.floor(Math.random()*allPages.length);
                      console.log(random)
                      console.log(allPages[random].title);
                      // movieDisplay.push(allPages[i].title);
                    };
                    // console.log(movieDisplay);
                  })
                }
              });
            }
            // // loop to generate 4 random movies from array containing data for all results from all pages
            // for (i=0; i<4; i++) {
            //   let random = Math.floor(Math.random()*allPages.length);
            //   // console.log(random);
            //   // console.log(allPages);
            //   movieDisplay.push(allPages.random);
            // };       
            // console.log(movieDisplay)
        })
      }
    });
}


// //   fetch(apiUrl).then((resp) => resp.json().then((data) => console.log(data))).catch();
//   try {
//     var resp = await fetch(apiUrl)
//     var data = await resp.json()
//       console.log(data)
//     // at this point you have a variable 'data' that contains the results of the API call. do with it what you want
//   } catch {
//     alert('api request failed')
//   }
// };
// this request fetches all movies in the genre 'action' that have an average rating of 8 or greater and which have greater than 500 ratings
// the 'greater than 500 ratings' part is abstracted in the function
// i.e. you do not need to specify a minimum rating threshold in the function call
// discoverMovies([28], 8);
// the genre ids that can be used with the API are as follows:

searchBtnEl.addEventListener("click", discoverMovies);












