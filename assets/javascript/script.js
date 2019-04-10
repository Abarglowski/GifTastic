//i was unable to complete this code
$(document).ready(function () {
var topics = ["GameOfThrones", "Avatar", "dota2", "csgo", "civilization5"]

function displayGifButtons() {
    $("#gifButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifButton = $("<button>");
        gifButton.addClass("gif");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtons").append(gifButton);
    }
}

function addNewButton() {
    $("#addGif").on("click", function () {
        var gif = $("#gif-input").val().trim();
        if (gif == "") {
            return false;
        }
        topics.push(gif);
        displayGifButtons();
        return false;
    });

}

function removeLastButton() {
    $("removeGif").on("click", function () {
        topics.pop(gif);
        displayGifButtons();
        return false;
    });

}

function displayGifs() {
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function (response) {
            $("#gifsView").empty();
            var results = response.data;
            if (results == "") {
                alert("There isn't a gif for this selection");
            }
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);

            }
        });
}

displayGifButtons();
addNewButton();
removeLastButton();

$(document).on("click", ".gif", displayGifs);
$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});