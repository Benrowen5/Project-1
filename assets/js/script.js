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
var movieOptions = document.getElementById("results-container");

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

var pageCheck = function(data){
  // reset covers
  movieOptions.innerHTML = "";
    // results < 20 works, but doesn't include check for duplicates.
  if (data.total_results <= 20) {
    for (i=0; i<4; i++) {
      // debugger;
      // console.log(data.total_results);
      random = Math.floor(Math.random()*data.total_results);
      // console.log(random)
      allPages.push(data.results[random]);
      console.log(allPages[i].title);
      // console.log(data.results[random].poster_path);

      let movie = document.createElement("div");
      // movie.setAttribute("src", "http://image.tmdb.org/t/p/w500" + data.results[random].poster_path);
      let imgUrl = "http://image.tmdb.org/t/p/w500" + data.results[random].poster_path;
      movie.innerHTML = "<img src='http://image.tmdb.org/t/p/w500" + data.results[random].poster_path + "' height: 100px width:auto />"
      movieOptions.appendChild(movie);
    }
  }

  if (data.total_results > 20) {
    setTimeout(() => {
      results(allPages); 
    }, 1000)   
    // start at i=1 because pagination starts at 1
    for (i=1; i<=data.total_pages; i++) {
      // make API call for each page of results data
      apiUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed" + selectedMpaaRating + selectedGenre + selectedMinRating + "&page=" + [i];
      fetch(apiUrl).then(function(response) {
        if(response.ok) {
          response.json().then(function(data) {
            console.log(data);
            //  debugger;
            // generate array containing results from each page in API response
            for (i=0; i<data.results.length; i++) {
              // console.log(data.results[i].title);
              allPages.push(data.results[i].title);
              // allPages.push(data.results[i]);
              // console.log(allPages);       
            }
             
          })
        }             
      })
    }
    
  }
};



var results = function(allPages) {
  // generate 4 random movies
  for (i=0; i<4; i++) {
    // debugger;
    random = Math.floor(Math.random()*allPages.length);
    // console.log(random)
    movieDisplay.push(allPages[random]);
    console.log(movieDisplay);
    
  }
}



// Discover Movies
var discoverMovies = function() {
  // clear storage variables
  movieDisplay = [];
  allPages = [];
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
          console.log(data);
          pageCheck(data);
      })
    }
  })
  // console.log(allPages)
}
  
    
  

searchBtnEl.addEventListener("click", discoverMovies);