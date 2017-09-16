var input = document.querySelector('input');
var search = document.querySelector('#search');
var results = document.querySelector('#results');
var loadMore = document.querySelector('#loadMore');

var query = '';

search.addEventListener('click', function() {
	if (input.value) {
		query = input.value;
		searchWikipedia(query);
	}
});

input.addEventListener('keypress', function(e) {
	if (e.keyCode === 13 && input.value) {
		query = input.value;
		searchWikipedia(query);
	};
});

// setting offset value for search results to be fetched 10 at a time from the API request
var sroffset = 0;

loadMore.addEventListener('click', function() {
	// each time 'loadMore' is clicked it'll fetch the 10 next search results
	sroffset += 10;
	// build 'continue' postfix to be added to API request
	let nextResults = `&sroffset=${sroffset}&continue=-||`;
	searchWikipedia(query, nextResults);
});

function searchWikipedia(query, nextResults = '') {
	var request = new XMLHttpRequest();
	var url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${query}${nextResults}`;
	
	request.open('GET', url, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    // Success!
			let data = JSON.parse(this.response);
			let ul = document.createElement("ul");
			results.appendChild(ul);
			data.query.search.forEach(function displayData (page) {
				let li = document.createElement("li");  
				li.innerHTML = `
					<p><a href="https://en.wikipedia.org/?curid=${page.pageid}" target="_blank">${page.title}</a></p>
					<p>${page.snippet}</p>
				`;
				ul.appendChild(li);
			});
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
