var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey
var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres="+movieGenre+"&sort_by=popularity_desc"

var movieGenre = localStorage.getItem('answer');
movieGenre = JSON.parse(movieGenre)[0];
console.log(localStorage)
console.log(movieGenre)

fetch(streamingAPI)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to connect to the server')
    });