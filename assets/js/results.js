
$(document).ready(function() {
    // IMPORTANT!!!!!!!!!!!!!!!!!! When testing the books API please comment out lines 23-44 so we dont burn all of our API usage
    var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
    var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey
    // grabs user selections from local storage
    // index keys are 0=movieGenre 1=bookGenre 2=bookYear 3=movieYear 4=streamSource
    var getChoices = localStorage.getItem('answer');
    // Assign user choices to variables
    var movieGenre = JSON.parse(getChoices)[0];
    var streamSource = JSON.parse(getChoices)[4];
    var movieYear = JSON.parse(getChoices)[3];
    //APIquery requires 8digit date written as YYYYMMDD
    var releaseDateStart = (movieYear + "0101")
    var releaseDateEnd = (Number(movieYear)) + 9
    releaseDateEnd = releaseDateEnd.toString() + "1231"


    // API key and url for Watchmode. Search by year and genre to get title suggestions for each streaming service
    var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
    var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres="+ movieGenre +"&types=movie&source_ids="+streamSource+"&source_types=sub&release_date_start="+releaseDateStart+"&release_date_end="+releaseDateEnd+"&sort_by=relevance_desc"
    var omdbKey =  "91e08ef";
    var omdbInfo = "https://www.omdbapi.com/?apikey="+omdbKey+"&plot=full&i="
    var omdbPoster = "https://www.omdbapi.com/?apikey="+omdbKey+"&i="

    //Use fetch to query the API, get suggestions.
    function getMovie (){
        fetch(streamingAPI)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data){
                    var movieTitle = data.titles[0].title
                    var imdbId = data.titles[0].imdb_id
                    console.log(imdbId);
                    //getPoster(imdbId);
                    //getMovieInfo(imdbId);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to the server')
        });
    }
    function getMovieInfo (imdbId) {
        omdbInfo = omdbInfo+imdbId;
        fetch(omdbInfo)
            .then(function (response){
                if (response.ok) {
                    response.json().then(function (data){
                        console.log(data)
                        $('#result1-movies-image').attr('src', data.Poster);
                        $('#result1-title').text(data.Title);
                        $('#result1-stars').text('Starring: '+data.Actors);
                        $('#result1-genre').text('Genre: '+data.Genre);
                        $('#result1-description').text('Plot: '+data.Plot)
                    });
                }
            });
    }
    getMovieInfo('tt3783958')

   

    //button for testing only. will be automatic on deployment
    var button = document.getElementById('button')
    button.addEventListener('click', getMovie)



    // added button to return to initial search page
    document.getElementById('return').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

})