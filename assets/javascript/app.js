$(document).ready(function() {
var movies = ["Tommy Boy", "The Departed", "Top Gun", "Road House", "Point Break", "Shawshank Redemption", "The Godfather", "Pulp Fiction", "Family Guy"];

$(document).on("click", function(){
  console.log(this)
})

function displayMovie() {
    $(".gifs-appear-here").empty();
    var movie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
$('.gifs-appear-here').append('<h2 class="result_title">Now Playing: <span>' + $(this).data('movie') + ' Gifs!</span></h2>' );
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response.data);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            // gifDiv.addClass('gif col-md-4 col-xs-12 col-sm-4');
            // gifDiv.append('<img class="gifImg" src=' + results[i].images.fixed_height_still.url + ' data-still=' + results[i].images.fixed_height_still.url + ' data-animate=' + results[i].images.fixed_height.url + ' data-state="still"/>');
            // gifDiv.append('<span class="label label-default">Rated: ' + results[i].rating + '</span>')

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

                var movieGif = $("<img>");
                movieGif.addClass("gifClick");
                movieGif.attr({
                    src: results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                });

            gifDiv.append(p);
            gifDiv.append(movieGif);
            $(".gifs-appear-here").append(gifDiv);
        }
        var row = $('div.gifs-appear-here > div');

        for (var j = 0; j < row.length; j += 2) {
            row.slice(j, j + 2).wrapAll('<div class="row mx-auto justify-content-between"></div>');
        }
    })
};

$(document).on("click", ".gifClick", function() {

    var state = $(this).attr("data-state");
    console.log(this);
    if (state == "still") {

        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
})


function makeButtons() {
    $(".buttons").empty();
    for (var i = 0; i < movies.length; i++) {
        var button = $("<button type='button' class='btn'>");
        button.addClass("buttonClass");
        button.attr("data-movie", movies[i]);
        button.append(movies[i]);
        $(".buttons").append(button);
    }
}

$(document).on("click", ".buttonClass", displayMovie);

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var newMovie = $("#movie-input").val().trim();
    if (newMovie !== "") {
        $("#movie-input").val("");
        movies.push(newMovie);
    }
    makeButtons();
})
makeButtons();

});