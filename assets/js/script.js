var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey
var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres=horror&sort_by=relevence_desc,popularity_desc"

// fetch(booksAPI)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })

// fetch(streamingAPI)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })


        // // Initialize dropdown functionality
        // var dropdown = document.querySelector('.dropdown');
        // dropdown.addEventListener('click', function(event) {
        //     event.stopPropagation();
        //     dropdown.classList.toggle('is-active');
        // });

        