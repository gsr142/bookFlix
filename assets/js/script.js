// create variable to refer to the submit button
var submitbtn = document.querySelector('#submit');

//function to describe what to run when the answers are saved
var saveAnswer = function (event) {
    event.preventDefault();
    // store in variables the values of the answers for each question
    var answer1 = document.getElementById('question1').value;
    var answer2 = document.getElementById('question2').value;
    var answer3 = document.getElementById('question3').value;
    var answer4 = document.getElementById('question4').value;
    var answer5 = document.getElementById('question5').value;
    //variable to return true in the local storage if the user have already completed the quiz
    var visited = true;
    //variable empty array of chosen options to answered questions
    var answer = [];
    //push new answered options to empty array
    answer.push(answer1, answer2, answer3, answer4, answer5);
    //store in the local storage the visited value (boolean true) converted into a string 'true'
    localStorage.setItem("visited", JSON.stringify(visited));
    // store in the local storage the array with the answered options converted to a string
    localStorage.setItem("answer", JSON.stringify(answer));
    // change the document location from index.html to results.html
    document.location.replace('results.html')
}
//runs the function saveAnswer upon clicking the submit button
submitbtn.addEventListener("submit", saveAnswer)

