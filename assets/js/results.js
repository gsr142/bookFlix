
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

    var movieDisplayArr1 = ['#result1-movies-image', '#result1-title', '#result1-stars', '#result1-genre', '#result1-description'];
    var movieDisplayArr2 = ['#result2-movies-image', '#result2-title', '#result2-stars', '#result2-genre', '#result2-description']
    var movieDisplayArr3 = ['#result3-movies-image', '#result3-title', '#result3-stars', '#result3-genre', '#result3-description']
    var movieDisplayArr4 = ['#result4-movies-image', '#result4-title', '#result4-stars', '#result4-genre', '#result4-description']




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
                    
                    var imdbId1 = data.titles[0].imdb_id
                    var imdbId2 = data.titles[1].imdb_id
                    var imdbId3 = data.titles[2].imdb_id
                    var imdbId4 = data.titles[3].imdb_id
                    console.log(imdbId1)
                    console.log(imdbId2)
                    console.log(imdbId3)
                    console.log(imdbId4)
                    getMovieInfo(imdbId1, movieDisplayArr1);
                    getMovieInfo(imdbId2, movieDisplayArr2);
                    getMovieInfo(imdbId3, movieDisplayArr3);
                    getMovieInfo(imdbId4, movieDisplayArr4)

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to the server')
        });
    }
    function getMovieInfo (imdbId, arr) {
        var getOmdbInfo = omdbInfo+imdbId;
        console.log(getOmdbInfo)
        fetch(getOmdbInfo)
            .then(function (response){
                if (response.ok) {
                    response.json().then(function (data){
                        console.log(data)
                        $(arr[0]).attr('src', data.Poster);
                        $(arr[1]).text(data.Title);
                        $(arr[2]).text('Starring: '+data.Actors);
                        $(arr[3]).text('Genre: '+data.Genre);
                        $(arr[4]).text('Plot: '+data.Plot)
                    });
                }
            });
    }
    // var movieDisplayArr1 = ['#result1-movies-image', '#result1-title', '#result1-stars', '#result1-genre', '#result1-description']
    // var testId = 'tt3783958'
    // getMovieInfo(testId, movieDisplayArr)
   

    //button for testing only. will be automatic on deployment
    var button = document.getElementById('button')
    button.addEventListener('click', getMovie)



    // added button to return to initial search page
    document.getElementById('return').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

})