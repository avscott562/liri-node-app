require("dotenv").config();

//connect to keys.js
const keys = require("./keys.js");

//Node packages

//spotify
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//Axios - use to grab data from the OMDB API and the Bands In Town API
const axios = require("axios");

//moment
let moment = require("moment");
// moment().format();

//fs
const fs = require("fs");

let action = "";
let search = [];
let searchTerm = "";

//grab action and search items from terminal
if (process.argv[2]) {
    action = process.argv[2].toLowerCase();
}

if (process.argv[3]) {
    search = process.argv.splice(3);
    console.log("this is hte search " + search);
    searchTerm= search.join("+").toLowerCase();
}

runBot(action, searchTerm, search)

function runBot(act, find, s) {
    //switch statement to call function based upon user requested action
switch(act) {
    case "concert-this":
        concertThis(find);
        break;
    
    case "spotify-this-song":
        spotifyThisSong(find, s);
        break;

    case "movie-this":
        movieThis(find, s);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please choose a valid action: concert-this, spotify-this-song, movie-this or do-what-it-says.");
}
}


// concert-this
function concertThis(find) {

    if (find != "") {
        axios.get("https://rest.bandsintown.com/artists/" + find + "/events?app_id=codingbootcamp")
    .then(function(response) {
        let concerts = response.data;

        if (concerts.length !== 0) {
            for (i=0; i<concerts.length; i++) {
                let eventInfo = concerts[i];
                let eventDate = moment(eventInfo.datetime.slice(0, 10)).format("MM-DD-YYYY");
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
    } else {
        console.log("Please enter an artist.")
    }
}

// spotify-this-song
function spotifyThisSong(find, s) {
    if (s.length === 0) {
        spotify.search({
            type: "track",
            query: "track:the sign artist:ace of base"
        })
        .then(function(response) {
            let song = response.tracks.items[0];
            console.log("Artist: " + song.artists[0].name + "\nSong Title: " + song.name + "\nSpotify Link: " + song.preview_url + "\nThis song is on the album " + song.album.name+ "." );
        })
        .catch(function(err) {
            console.log(err);
        })
    } else {
        searchTerm = find.replace("+", " ");
        spotify.search({
            type: "track",
            query: searchTerm
        })
        .then(function(response) {
            let song = response.tracks.items[0];
            console.log("Artist: " + song.artists[0].name + "\nSong Title: " + song.name + "\nSpotify Link: " + song.preview_url + "\nThis song is on the album " + song.album.name+ "." );
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

// movie-this
function movieThis(find, s) {
    if (s.length === 0) {
        searchTerm = "mr+nobody";
    } else {
        searchTerm = find.replace(".", "");
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
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        let readArr = data.split(",");

        // console.log(readArr);
        action = readArr[0];
        
        let str= readArr[1].toString();

        let strL = str.length;

        let newStr = str.substring(1, strL-1);
        // console.log(newStr);

        search = newStr.split(" ");
        searchTerm = search.join("+");

        // console.log(action);
        // console.log(search);
        // console.log(searchTerm);

        runBot(action, searchTerm, search);

    })
}


