// script.js

// Get all script entries
var scripts = document.querySelectorAll('.script');
// Number of scripts per page
var scriptsPerPage = 5;
// Current page
var currentPage = 1;

// Show scripts for the current page
function showScripts(page) {
    var startIndex = (page - 1) * scriptsPerPage;
    var endIndex = startIndex + scriptsPerPage;

    scripts.forEach(function(script, index) {
        if (index >= startIndex && index < endIndex) {
            script.style.display = 'block';
        } else {
            script.style.display = 'none';
        }
    });
}

// Show the first page initially
showScripts(currentPage);

document.querySelector('.prev').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        showScripts(currentPage);
    }
});

document.querySelector('.next').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage < Math.ceil(scripts.length / scriptsPerPage)) {
        currentPage++;
        showScripts(currentPage);
    }
});

document.getElementById("searchInput").addEventListener("keyup", function() {
    var input, filter, scripts, script, title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    scripts = document.getElementsByClassName("script");
    var matchFound = false; // Flag to track if any scripts match the search query

    for (i = 0; i < scripts.length; i++) {
        script = scripts[i];
        title = script.getElementsByTagName("h2")[0];
        if (filter === '') { // Show all scripts if search input is empty
            script.style.display = 'block';
            matchFound = true;
        } else if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
            script.style.display = 'block'; // Show the script box if it matches the search query
            matchFound = true; // Set the flag to true if a match is found
        } else {
            script.style.display = 'none'; // Hide the script box if it doesn't match the search query
        }
    }

    // Create the "No scripts match your search" message if no match is found
    var noMatchMessage = document.getElementById("noMatchMessage");
    if (!matchFound && filter !== '') {
        if (!noMatchMessage) {
            noMatchMessage = document.createElement("p");
            noMatchMessage.id = "noMatchMessage";
            noMatchMessage.textContent = "No scripts match your search.";
            noMatchMessage.classList.add("no-match-message");
            document.getElementById("scriptsContainer").appendChild(noMatchMessage);
        }
    } else {
        if (noMatchMessage) {
            noMatchMessage.remove(); // Remove the message if a match is found or search input is empty
        }
    }
});