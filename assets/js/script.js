var searchBtnEl = document.querySelector("#searchBtn"); 
var pastSearchesEl = document.querySelector("#saved-searches")
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
var savedContainer = document.getElementById("saved-container")

var apiKey = "e7f1b20f0b6095eb3bfbbb6951d074ed";
var selectedMpaaRating = "";
var selectedGenre = "";
var selectedMinRating = "";
var movieDisplay = [];
var allPages = [];
var posterPath = [];

var modal = document.getElementById("modal");
var close = document.getElementById("close");
var closeSaved = document.getElementById("close-saved");
var savedModal = document.getElementById("saved-modal")
var savedList = document.getElementById("saved-list");

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
  // param for average rating, minimum of 20 ratings
  selectedMinRating = "&vote_count.gte=20&vote_average.gte=" 
  // get value from rating slider and add to minimumRating var
  selectedMinRating += rating.value;
  console.log(selectedMinRating)
};

var pageCheck = function(data){
  // reset covers
  movieOptions.innerHTML = "";
    // if statement for when there are less than 20 results, or only 1 page of results
  if (data.total_results <= 20) {
    if (data.total_results === 0) {
      
      alert("No movie results found that meet search criteria. Please try again.");
    }
    for (i=0; i<4; i++) {
      // debugger;
      // console.log(data.total_results);
      random = Math.floor(Math.random()*data.total_results);
      // console.log(random)
      allPages.push(data.results[random]);
      console.log(allPages[i].title);
      // console.log(data.results[random].poster_path);

      let movie = document.createElement("div");
      movie.setAttribute("style", "display: inline");
      // movie.setAttribute("src", "https://image.tmdb.org/t/p/w500" + data.results[random].poster_path);
      let imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[random].poster_path;
      movie.innerHTML = "<img src='https://image.tmdb.org/t/p/w500" + data.results[random].poster_path + "' height: 100px width:auto />"
      modal.setAttribute("style", "display: block");
      movieOptions.appendChild(movie);
      // save movies to localStorage
      localStorage.setItem('movie-title', JSON.stringify(movieDisplay));
    }
  }

  // if statement for when there are multiple pages of results
  if (data.total_results > 20) {
    // timeout to wait for page results data to be fetched.
    setTimeout(() => {
      displayResults(allPages, posterPath); 
    }, 1000)   
    // start at i=1 because pagination starts at 1
    for (i=1; i<=data.total_pages; i++) {
      // make API call for each page of results data
      apiUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed" + selectedMpaaRating + selectedGenre + selectedMinRating + "&page=" + [i];
      fetch(apiUrl).then(function(response) {
        if(response.ok) {
          response.json().then(function(data) {
            console.log(data);
            // Populate 2 different arrays containing results for paths to movie posters and 
            // movie titles from each page in API response
            for (i=0; i<data.results.length; i++) {
              // local variable to store movie poster paths
              let pageResults = data.results[i].poster_path;
              // store paths for movie links into global variable to access in displayResults function
              posterPath.push(pageResults);
              allPages.push(data.results[i].title);
            }
          })
        }             
      })
    }
  }
};

var displayResults = function(allPages, posterPath) {
  // generate 4 random movies from results for all pages
  for (i=0; i<4; i++) {
    random = Math.floor(Math.random()*allPages.length);
    // push random result to 
    movieDisplay.push(allPages[random]);
    let movie = document.createElement("div");
    movie.setAttribute("style", "display: inline")
    let imgUrl = "https://image.tmdb.org/t/p/w500" + posterPath[random];
    movie.innerHTML = "<img src='https://image.tmdb.org/t/p/w500" + posterPath[random] + "' height: 100px width:auto />"
    movieOptions.appendChild(movie);    
  }
  console.log(movieDisplay);
  // open modal to show results
  localStorage.setItem('movie-title', JSON.stringify(movieDisplay));
  modal.setAttribute("style", "display: block");
};

// main function called by click eventListener 
var discoverMovies = function() {
  // clear results storage variables
  // movieDisplay = [];
  allPages = [];
  posterPath = [];

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
};

var displaySaved = function() {
  // console.log(movieDisplay);
  savedModal.setAttribute("style", "display: block");
  let savedMovie = JSON.parse(localStorage.getItem('movie-title'));
  // console.log(savedMovie);
  // loop to create a list item for each movie in localStorage
  for (i=0; i<savedMovie.length; i++) {
    let savedTitle = document.createElement("li");
    savedTitle.setAttribute("class", "list-group-item");
    savedTitle.setAttribute("style", "background-color: rgba(77, 75, 75, 0); color: white");
    savedTitle.textContent = savedMovie[i];
    savedList.appendChild(savedTitle);
  };
  
};

var closeModal = function() {
  movieDisplay = [];
  allPages = [];
  posterPath = [];
  savedModal.setAttribute("style", "display: none");
  modal.setAttribute("style", "display: none");
  
};
  
// event listener which 
searchBtnEl.addEventListener("click", discoverMovies);
pastSearchesEl.addEventListener("click", displaySaved);
close.addEventListener("click", closeModal);
closeSaved.addEventListener("click", closeModal);