var animals = ["duck", "turtle", "gorilla", "giraffe", "mouse"];

function displayAnimal(){
var animal = $(this).attr("data-animal");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
        	console.log(response.data);
 			var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.addClass("gifClick");
            animalImage.attr({
                src: results[i].images.fixed_height.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
            });

            gifDiv.append(p);
            gifDiv.append(animalImage);
            $(".gifs-appear-here").prepend(gifDiv);
          }
          
          $(".gifClick").on("click", function(){

            	var state = $(this).attr("data-state");
            	console.log(this);
		        if (state == "still") {

		            $(this).attr("data-state", "animate");
		            $(this).attr("src", $(this).attr("data-animate"));
		        }
		        else {
		            $(this).attr("data-state", "still");
		            $(this).attr("src", $(this).attr("data-still"));          
		        }
            })
        })
};


function makeButtons(){
	$(".buttons").empty();
	for (var i = 0; i < animals.length; i++) {
		var button = $("<button type='button' class='btn btn-success'>");
		button.addClass("buttonClass");
		button.attr("data-animal", animals[i]);
		button.text(animals[i]);
		$(".buttons").append(button);
	}
}

$(document).on("click", ".buttonClass", displayAnimal);

$("#add-animal").on("click", function(event) {
	event.preventDefault();
	var newAnimal = $("#animal-input").val().trim();
	if (newAnimal !== "") {
		$("#animal-input").val("");
		animals.push(newAnimal);
	}
	makeButtons();
})
	makeButtons();
