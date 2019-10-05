require("dotenv").config();

//connect to keys.js
const keys = require("./keys.js");

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

//grab search and action items from terminal
let action = process.argv[2].toLowerCase();
console.log(action);
let searchTerm = process.argv.splice(3);
let artist = searchTerm.join("+");
console.log(artist);

switch(action) {
    case "concert-this":
        concertThis();
        break;

    default:
        console.log("Please choose a valid action: concert-this, spotify-this-song, movie-this or do-what-it-says.");
}

//To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.



// Node-Spotify-API

// let getArtist = async (artist) => {
//     let response = await axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     console.log(response.data)
// }




// You'll use Axios to grab data from the OMDB API and the Bands In Town API

function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
        let concerts = response.data;

        for (i=0; i<concerts.length; i++) {
            // console.log (concerts[0]);
            let eventInfo = concerts[i];
            let eventDate = moment(eventInfo.datetime.slice(0, 9)).format("MM-DD-YYYY");
            console.log ("Event # " + (i+1) + "\nVenue Name: " + eventInfo.venue.name + "\nVenue Location: " + eventInfo.venue.city + "\nEvent Date: " + eventDate);
            console.log("\n");
        }
    
    })
}


// spotify-this-song
// movie-this
// do-what-it-says
