// create variable to refer to the submit button
var submitbtn = document.querySelector('#submit');
var selectContainer = document.querySelector('#selectContainer');

//function to describe what to run when the answers are saved
var saveAnswer = function (event) {
    event.preventDefault();
    // store in variables the values of the answers for each question
    var answer1 = document.getElementById('question1').value;
    var answer2 = document.getElementById('question2').value;
    var answer3 = document.getElementById('question3').value;
    var answer4 = document.getElementById('question4').value;
    var answer5 = document.getElementById('question5').value;

    var selectElements = [document.getElementById('question1'), document.getElementById('question2'), document.getElementById('question3'), document.getElementById('question4'), document.getElementById('question5')];


    // Iterate through each select element and check if an answer is selected
    for (var i = 0; i < selectElements.length; i++) {
        if (selectElements[i].value === "Select Answer") {
            selectElements[i].style.borderColor = 'red';
        } else {
            // selectElements[i].classList.remove('incomplete'); // Remove 'incomplete' class if an answer is selected
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
    }
    
        //variable to return true in the local storage if the user have already completed the quiz
        
    
}
//runs the function saveAnswer upon clicking the submit button
submitbtn.addEventListener("submit", saveAnswer)

