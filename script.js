var input = document.querySelector('input');
var search = document.querySelector('button');

search.addEventListener('click', function() {
	if (input.value) {
		console.log('just clicked on search button');
		searchWikipedia(input.value);
	}
});

input.addEventListener('keypress', function(e) {
	if (e.keyCode === 13 && input.value) {
		console.log('just pressed enter key with valid search query');
		searchWikipedia(input.value);
	};
});

function searchWikipedia(query) {
	var request = new XMLHttpRequest();
	var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${query}`;
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var resp = request.responseText;
	  	console.log('success! resp: ', resp);
	  } else {
	    // We reached our target server, but it returned an error
	    console.log('error!');
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  console.log('connection error!');
	};

	request.send();
}

	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  console.log('connection error!');
	};

	request.send();
}



// Continue url:
// https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=Richard+Feynman&sroffset=10&continue=-||