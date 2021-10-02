var searchBtnEl = document.querySelector("#searchBtn"); 
var gRatingCheckbox = document.getElementById("#gRating");
var pgRatingCheckbox = document.getElementById("#pgRating");
var pg13RatingCheckbox = document.getElementById("#pg13Rating");
var rRatingCheckbox = document.getElementById("#rRating");

var getMovieTitle = function(selectedRating) {
    var apiUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed" + selectedRating;
    fetch(apiUrl).then(function(response) {
    if(response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            })
        }
    });
}

// function to search for a movie based on rating
var movieIdGen = function() {
    selectedRating
    getMovieTitle(movieId);

};

var checkRating = function(event) {
    var selectedRating = "&certification_country=US";
    event.preventDefault();
    if (gRating.checked) {
        console.log("G rating checked");
        selectedRating += "&certification=G";
    }
    if (pgRating.checked) {
        console.log("PG rating selected");
        selectedRating += "&certification=PG";
    }
    if (pg13Rating.checked) {
        console.log("PG-13 rating selected");
        selectedRating += "&certification=PG-13";
    }
    if (rRating.checked) {
        console.log("R rating selected");
        selectedRating += "&certification=R";
    };
    getMovieTitle(selectedRating);
};

// movieIdGen();

searchBtnEl.addEventListener("click", checkRating);


/ movieIdGen();
// Discover Movies
var discoverMovies = async function (arrayGenres, minimumRating) {
  // arrayGenres is going to look something like [1, 2, 3]
  // our API expects a string like "1,2,3"
  // arrayGenres.join(',')
  // &with_genres=1,2,3
  var apiUrl =
    "https://api.themoviedb.org/3/discover/movie" +
    "?api_key=" +
    apiKey +
    "&vote_average.gte=" + // param for average rating
    minimumRating +
    "&with_genres=" + // param for genres
    arrayGenres.join(",") +
    "&vote_count.gte=500"; // must have greater than 500 ratings
  console.log(apiUrl);
//   fetch(apiUrl).then((resp) => resp.json().then((data) => console.log(data))).catch();
  try {
    var resp = await fetch(apiUrl)
    var data = await resp.json()
    // console.log(data)
    // at this point you have a variable 'data' that contains the results of the API call. do with it what you want
  } catch {
    alert('api request failed')
  }
};
// this request fetches all movies in the genre 'action' that have an average rating of 8 or greater and which have greater than 500 ratings
// the 'greater than 500 ratings' part is abstracted in the function
// i.e. you do not need to specify a minimum rating threshold in the function call
discoverMovies([28], 8);
// the genre ids that can be used with the API are as follows:
// "genres": [
//     {
//         "id": 28,
//         "name": "Action"
//     },
//     {
//         "id": 12,
//         "name": "Adventure"
//     },
//     {
//         "id": 16,
//         "name": "Animation"
//     },
//     {
//         "id": 35,
//         "name": "Comedy"
//     },
//     {
//         "id": 80,
//         "name": "Crime"
//     },
//     {
//         "id": 99,
//         "name": "Documentary"
//     },
//     {
//         "id": 18,
//         "name": "Drama"
//     },
//     {
//         "id": 10751,
//         "name": "Family"
//     },
//     {
//         "id": 14,
//         "name": "Fantasy"
//     },
//     {
//         "id": 36,
//         "name": "History"
//     },
//     {
//         "id": 27,
//         "name": "Horror"
//     },
//     {
//         "id": 10402,
//         "name": "Music"
//     },
//     {
//         "id": 9648,
//         "name": "Mystery"
//     },
//     {
//         "id": 10749,
//         "name": "Romance"
//     },
//     {
//         "id": 878,
//         "name": "Science Fiction"
//     },
//     {
//         "id": 10770,
//         "name": "TV Movie"
//     },
//     {
//         "id": 53,
//         "name": "Thriller"
//     },
//     {
//         "id": 10752,
//         "name": "War"
//     },
//     {
//         "id": 37,
//         "name": "Western"
//     }
// ]












