// IMPORTANT!!!!!!!!!!!!!!!!!! When testing the books API please comment out lines 23-44 so we dont burn all of our API usage
var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=subject="+bookGenre+"&startIndex=0&maxResults=40&key="+booksApiKey;
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
var streamingAPI = "https://api.watchmode.com/v1/list-titles/?apiKey=" + streamKey + "&genres=" + movieGenre + "&types=movie&source_ids=" + streamSource + "&source_types=sub&release_date_start=" + releaseDateStart + "&release_date_end=" + releaseDateEnd + "&sort_by=relevance_desc"


// Use fetch to query the API, get suggestions.
// function getMovie (){
//     fetch(streamingAPI)
//     .then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data){

//                 console.log(data.titles)


//             });
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//     })
//     .catch(function(error) {
//         alert('Unable to connect to the server')
//     });
// }

// //button for testing only. will be automatic on deployment
var button = document.getElementById('button')
button.addEventListener('click', getBook)



var bookGenre = JSON.parse(getChoices)[1];
var bookYear = JSON.parse(getChoices)[2];
// console.log(bookGenre);
var yearRange = bookYear.split('-');
var startYear = parseInt(yearRange[0]);
var endYear = parseInt(yearRange[1]);

var yearArray = [];
for (var year = startYear; year <= endYear; year++) {
    yearArray.push(year);
};
function getBook() {
    fetch(booksAPI)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayBook(data);
                });
            } else {
                alert("Error");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to server");
        });
}

function displayBook(data) {

    var matchedItems = [];
    var Container = document.getElementById('bookContainer');

    Container.innerHTML = '';

    for (var i = 0; i < data.items.length; i++) {
        var publishedDate = data.items[i].volumeInfo.publishedDate;
        var yearPublished = parseInt(publishedDate.substring(0, 4));

        if (yearArray.includes(yearPublished)) {
            matchedItems.push(data.items[i]);
            
            var title = data.items[i].volumeInfo.title;
            var author = data.items[i].volumeInfo.authors;
            var category = data.items[i].volumeInfo.categories;
            var description = data.items[i].volumeInfo.description;
            var images = data.items[i].volumeInfo.imageLinks.smallThumbnail;

            var columnsDiv = document.createElement('div');
            columnsDiv.classList.add('columns');

            var imageColumnDiv = document.createElement('div');
            imageColumnDiv.classList.add('column', 'is-3');

            var bookImage = document.createElement('img');
            bookImage.src = images;
            bookImage.alt = title;
            bookImage.width = '120';
            bookImage.height = '150';

            var detailsColumnDiv = document.createElement('div');
            detailsColumnDiv.classList.add('column');

            var resultContainer = document.createElement('ul');

            var titleEl = document.createElement('li');
            titleEl.textContent = 'Title: ' + title;

            var authorEl = document.createElement('li');
            authorEl.textContent = 'Author: ' + author;

            var categoryEl = document.createElement('li');
            categoryEl.textContent = 'Category: ' + category;

            var descriptionEl = document.createElement('li');
            descriptionEl.textContent = 'Description: ' + description;

            Container.appendChild(columnsDiv);
            columnsDiv.appendChild(imageColumnDiv);
            imageColumnDiv.appendChild(bookImage);
            columnsDiv.appendChild(detailsColumnDiv);
            detailsColumnDiv.appendChild(resultContainer);
            resultContainer.appendChild(titleEl);
            resultContainer.appendChild(authorEl);
            resultContainer.appendChild(categoryEl);
            resultContainer.appendChild(descriptionEl);
        }
    }
    console.log(matchedItems);
}
// added button to return to initial search page
document.getElementById('return').addEventListener('click', function () {
    window.location.href = 'index.html';
});
