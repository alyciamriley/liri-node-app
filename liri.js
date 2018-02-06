require("dotenv").config();
require("./keys.js");
var fs = require('fs');
var request = require("request");
var spotify = require("spotify");
var twitter = require("twitter");
var inquirer = require("inquirer");



//set up flow control

var operation= process.argv;
var params = "",
for(i=3; i<process.argv.length; i++){
    params = params + " " + process.argv[i];
}

switch(operation) {
    case "my-tweets":
        doTweets();
        break;
    case "spotify-this-song":
        doSpotify();
        break;
    case "movie-this":
        doIMDB();
        break;
    case "do-what-it-says":
        doRandom();
        break;
        
}
//Liri should take the following commands--

//my-tweets: showed last 20 tweets and when they were created



//spotify-this-song:  shows artist, songs name, preview link of song, album song is from, defaults to Ace of Base


//movie-this: title of movie, year movie came out, IMDB rating of movie, Rotten Tomatoes rating of movie, country where movie was produced, language of movie, plot of movie, actors in movie

request("https://www.omdbapi.com/&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
      console.log("The movie's IMDB rating is:  " + JSON.parse(body).imdbRating);
  }
});

//title, year,imdbRating, 
//do-what-it-says:  will run the text inside of random.txt
