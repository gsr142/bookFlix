var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey
// grabs user selections from local storage
// index keys are 0=movieGenre 1=bookGenre 2=bookYear 3=movieYear 4=streamSource
var getChoices = localStorage.getItem('answer');
// Assign user choices to variables
var movieGenre = JSON.parse(getChoices)[0];
var streamSource = JSON.parse(getChoices)[4];
var movieYear = JSON.parse(getChoices)[3];
var releaseDateStart = (movieYear + "0101")
var releaseDateEnd = (Number(movieYear)) + 9
releaseDateEnd = releaseDateEnd.toString() + "1231"
console.log(movieYear)
console.log(releaseDateStart)
console.log(releaseDateEnd)



var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres="+ movieGenre +"&types=movie&sources="+streamSource+"&source_types=sub&release_date_start="+releaseDateStart+"&release_date_end="+releaseDateEnd+"&sort_by=relevance_desc"



console.log(localStorage)
console.log(streamingAPI)


function getMovie (){
    fetch(streamingAPI)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
                console.log(data.titles)
                

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