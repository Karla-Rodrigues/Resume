//  JQuery - NASA Photos in Flickr
//
// pagination variables
console.log("inicio");

var numPage = 1;
var totalPages = 65;

// Format variables to be use
var apiKey = "a5e95177da353f58113fd60296e1d250";
var userId = "24662369@N07";
var flickrApiUrl = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key="
	+ apiKey + "&user_id=" + userId + "&format=json&nojsoncallback=1";

$(function () {

	console.log("getJSON");

	loadPhotos();
	
});

function loadMore() {

	clearSearch();

	if (numPage < totalPages) {
		numPage = numPage + 1;
	}

	loadPhotos();

}

function loadPhotos() {

	// Options in the access
	$.getJSON(flickrApiUrl, {
		page: numPage,
		tagmode: "any",
		format: "json"

		// Access with success
	}).done(function (data) {

		console.log(data);

		$.each(data.photos.photo, function (index, item) {

			var urlPhoto = "https://farm" // format the https line with NASA information
				+ item.farm
				+ ".staticflickr.com/"
				+ item.server
				+ "/" + item.id
				+ "_" + item.secret
				+ ".jpg";

			var titlePhoto = item.title;
			var titlePhoto = titlePhoto.toLowerCase();

			$("<img>").attr("src", urlPhoto).attr("name", titlePhoto).attr("id", "photo").appendTo("#Photos")

		});

		// Access with failure
	}).fail(function () {
		alert("Ajax call failed."); // message as pop-up windows
	});
	
}

function searchTitle() {

	var searchValue = document.getElementById("vlSearch").value;
	var text = '[name*="' + searchValue + '"]';
	var text = text.toLowerCase();

	console.log("text " + text)

	if (text != '[name*=""]') {

		console.log(searchValue + " " + text); // message as pop-up windows

		$('img').not(text).hide(2000);

		document.getElementById("vlSearch").value = "";
	}

	$('#logo').show(1);
}

function clearSearch() {

	$('img').show(2000);

}