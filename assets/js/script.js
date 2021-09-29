var responseDataEl = document.querySelector("#response-data");
var titleEl = document.querySelector("#title");
var imgEl = document.querySelector("#img-card");

var getMovieTitle = function(movieId) {
    var apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=e7f1b20f0b6095eb3bfbbb6951d074ed";
    fetch(apiUrl).then(function(response) {
    if(response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            titleEl.textContent = data.title;
            })
        }
    });
}

// function to create random movie id
var movieIdGen = function() {
    var movieId = "550988";
    getMovieTitle(movieId)
};

movieIdGen();


