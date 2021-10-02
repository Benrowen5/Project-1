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