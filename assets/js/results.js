
$(document).ready(function () {
    // IMPORTANT!!!!!!!!!!!!!!!!!! When testing the books API please comment out lines 23-44 so we dont burn all of our API usage
    var booksApiKey = "AIzaSyBzxk-Jd5sokQW1oRM9XJS4Np1hbEmum1I"
    var booksAPI = "https://www.googleapis.com/books/v1/volumes?q=subject=" + bookGenre + "&startIndex=0&maxResults=40&key=" + booksApiKey
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
    var omdbKey = "91e08ef";
    var omdbInfo = "https://www.omdbapi.com/?apikey=" + omdbKey + "&plot=full&i="


    function createMovieDisplay(index) {
        return ['#result' + index + '-movies-image', '#result' + index + '-title', '#result' + index + '-stars', '#result' + index + '-genre', '#result' + index + '-description'];
    }

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
    // var button = document.getElementById('button')
    // button.addEventListener('click', getBook())

    getBook();
    getMovie();
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
                    response.json()
                        .then(function (data) {
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
                var bookid = data.items[i].id;
                var buyLink = data.items[i].saleInfo.buyLink;
                var saleability = data.items[i].saleInfo.saleability;
                var publisher = data.items[i].volumeInfo.publisher;

                var columnsDiv = document.createElement('div');
                columnsDiv.classList.add('columns');

                var imageColumnDiv = document.createElement('div');
                imageColumnDiv.classList.add('column', 'is-3');

                var imgBtn = document.createElement('a');
                imgBtn.setAttribute('type', 'submit');
                imgBtn.addEventListener('click', displayBookDetail.bind(null, title, author, category, description, images, bookid, buyLink, saleability, publisher, publishedDate));

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
                imageColumnDiv.appendChild(imgBtn);
                imgBtn.appendChild(bookImage);
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

    function displayBookDetail(title, author, category, description, images, bookid, buyLink, saleability, publisher, publishedDate) {
        var modal = document.createElement('div');
        modal.classList.add('modal', 'is-active');
        modal.innerHTML = `
                            <div class="modal-background"></div>
                            <div class="modal-card p-4">
                            <header class="modal-card-head">
                                <p class="modal-card-title">${title}</p>
                                <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                                <img src ='${images}'><br>
                                <b>Author: </b>${author}<br>
                                <b>Category: </b>${category}<br>
                                <b>Description: </b>${description}<br>
                                <b>Bookid: </b>${bookid}<br>
                                <b>Saleability: </b>${saleability}<br>
                                <b>BuyLink: </b> ${buyLink}<br>
                                <b>Publisher: </b>${publisher}<br>
                                <b>PublishedDate: </b>${publishedDate}<br>
                            </section>
                            <footer class="modal-card-foot">
                            </footer>
                            </div>` ;

            modal.querySelector('.delete').addEventListener('click', function () {
            modal.classList.remove('is-active');
        });

        document.body.appendChild(modal);
    }

    function getMovie() {
        fetch(streamingAPI)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // console.log(data);
                        if (data.titles.length === 0) {
                            console.log("no data found");
                        }
                        for (var i = 0; i < data.titles.length && i < 4; ++i) {
                            getMovieInfo(data.titles[i].imdb_id, createMovieDisplay(i))
                        }
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to the server')
            });
    }
    function getMovieInfo(imdbId, arr) {
        var getOmdbInfo = omdbInfo + imdbId;
        console.log(getOmdbInfo)
        fetch(getOmdbInfo)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data)
                        $(arr[0]).attr('src', data.Poster);
                        $(arr[1]).text(data.Title);
                        $(arr[2]).text('Starring: ' + data.Actors);
                        $(arr[3]).text('Genre: ' + data.Genre);
                        $(arr[4]).text('Plot: ' + data.Plot)
                    });
                }
            });
    }

    document.getElementById('return').addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'index.html';
    });
});
