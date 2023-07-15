var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key="+booksApiKey
var streamKey = "CmuYlyfZgLsyiWCJA2h829wGh6WRb77CHmcowDQP"
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres=horror&sort_by=relevence_desc,popularity_desc"
var submitbtn = document.querySelector('#submit');

var saveAnswer = function (event) {
    event.preventDefault();
    var answer1 = document.getElementById('question1').value;
    var answer2 = document.getElementById('question2').value;
    var answer3 = document.getElementById('question3').value;
    var answer4 = document.getElementById('question4').value;
    var answer5 = document.getElementById('question5').value;
    var visited = true;
    var answer = [];
    answer.push(answer1, answer2, answer3, answer4, answer5);
    localStorage.setItem("visited", JSON.stringify(visited));
    localStorage.setItem("answer", JSON.stringify(answer));

}
submitbtn.addEventListener("submit", saveAnswer)



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

        