//add npm packages
//DotEnv
require("dotenv").config();

//connect to keys.js
const keys = require("./keys.js");

//Axios
const axios = require("axios");

//fs
const fs = require("fs");

//spotify
// let Spotify = require("node-spotify-api");

// let spotify = new Spotify({
//     id: "<your spotify client id>",
//     secret: "<your spotify client secret>"
// });

//moment
let moment = require("moment");
// moment().format();

//To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.



// Node-Spotify-API

// let getArtist = async (artist) => {
//     let response = await axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     console.log(response.data)
// }




// You'll use Axios to grab data from the OMDB API and the Bands In Town API
let artist = process.argv[2];
console.log(artist)

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function(response) {
    console.log(response.data);
})
// concert-this


// spotify-this-song
// movie-this
// do-what-it-says
