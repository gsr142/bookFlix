
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

        