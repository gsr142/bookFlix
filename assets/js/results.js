var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey

var getChoices = localStorage.getItem('answer');
var movieGenre = JSON.parse(getChoices)[0];
var streamSource = JSON.parse(getChoices)[4];

var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres="+ movieGenre +"&types=movie&sources"+streamSource+"sort_by=popularity_desc"


console.log(movieGenre)
console.log(localStorage)
console.log(streamingAPI)


function getMovie (){
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
}

//button for testing only
var button = document.getElementById('button')
button.addEventListener('click', getMovie)