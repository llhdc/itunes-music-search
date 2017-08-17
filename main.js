/*
  Here is a rough idea for the steps you could take:
*/

// Declaring variables - url for data fetch; searchForm and searchInput to

let searchForm = document.getElementById("search");
let searchInput = searchForm.value;
let main = document.querySelector("main");
let button = document.querySelector("button");

button.addEventListener("click", function(e) {
  //prevent the normal submission of the form
  e.preventDefault();
  let url = `https://itunes.apple.com/search?term=${searchForm.value}&entity=musicTrack`;
  console.log(searchForm);

  fetch(url)
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(data => {
        // Declare variable for artist template container
        let artistContainer = "";
        // Iterate over data set and manipulate each data result
        data.results.forEach(result => {
          // Check if result.artworkUrl100 contains an img url and enter placeholder if not
          if (result.artworkUrl100 === "") {
            result.artworkUrl100 = "http://via.placeholder.com/165x80";
          }
          // Define template to use with data and enter into discrete container
          let template = `<section class="result">
                  <img class="art" src='${result.artworkUrl100}'>
                  <span class="track">${result.trackName}</span>
                  <p>${result.artistName}</p>
                 </section>
                `;
          // For each data template, insert via concatenation to artistContainer
          artistContainer += template;
        });
        // After each for each method executes insert template container into HTML.
        main.innerHTML = artistContainer;

        // Get an array of tracks, loop through the array adding an event listener to the track name so when clicked, will set the audio tag src attribute to the fetched data result 'previewUrl' attribute.

        let tracks = document.getElementsByClassName("track");
        let audio = document.getElementById("audio");

        for (let i = 0; i < tracks.length; i++) {
          tracks[i].addEventListener("click", function(e) {
            audio.setAttribute("src", data.results[i].previewUrl);
          });
        }

      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
});
