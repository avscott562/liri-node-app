require("dotenv").config();

//connect to keys.js
const keys = require("./keys.js");

//Node packages

//spotify
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//Axios
const axios = require("axios");

//moment
let moment = require("moment");
// moment().format();

//fs
const fs = require("fs");



// let spotify = new Spotify({
//     id: "<your spotify client id>",
//     secret: "<your spotify client secret>"
// });

//grab action and search items from terminal
let action = process.argv[2].toLowerCase();
console.log(action);
let search = process.argv.splice(3);
let searchTerm= search.join("+");
console.log("Searching for " + searchTerm);


//switch statement to call function based upon user requested action
switch(action) {
    case "concert-this":
        concertThis();
        break;
    
    case "spotify-this-song":
            console.log("run spotify function");
            break;

    case "movie-this":
            movieThis();
            break;

    default:
        console.log("Please choose a valid action: concert-this, spotify-this-song, movie-this or do-what-it-says.");
}



// let getArtist = async (artist) => {
//     let response = await axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     console.log(response.data)
// }


// You'll use Axios to grab data from the OMDB API and the Bands In Town API

// concert-this
function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function(response) {
        let concerts = response.data;

        if (concerts.length !== 0) {
            for (i=0; i<concerts.length; i++) {
                // console.log (concerts[0]);
                let eventInfo = concerts[i];
                let eventDate = moment(eventInfo.datetime.slice(0, 9)).format("MM-DD-YYYY");
                console.log ("Event # " + (i+1) + "\nVenue Name: " + eventInfo.venue.name + "\nVenue Location: " + eventInfo.venue.city + "\nEvent Date: " + eventDate);
                console.log("\n");
            }
        } else {
            console.log("There are no concert dates scheduled in the near future.");
        }
    
    })
    .catch(function(error) {
        console.log(error);
    })
}

// spotify-this-song


// movie-this
function movieThis() {
    if (search.length === 0) {
        console.log("No search term provided");
        searchTerm = "mr+nobody";
        console.log(searchTerm);
    }
    
    axios.get("https://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy")
    .then(function(response) {
        let movie = response.data;
        console.log("\n" + movie.Title + " came out in " + movie.Year + ".  It stars " + movie.Actors + ".  IMDB rated this movie " + movie.Ratings[0].Value + ".  Rotten Tomatoes rated this movie " + movie.Ratings[1].Value + ".  " + movie.Title + " was produced in " + movie.Country + " in " + movie.Language + ".\n\nMovie Premise: " + movie.Plot);
    })
    .catch(function(error) {
        console.log("Please enter a valid movie title.");
    })
}



// do-what-it-says
