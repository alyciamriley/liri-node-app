require("dotenv").config();
require("./keys.js");
var fs = require('fs');
var request = require("request");
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var inquirer = require("inquirer");



//set up flow control

var operation = process.argv[2];
var params = "";
for (i = 3; i < process.argv.length; i++) {
    params = params + " " + process.argv[i];
}
//console.log(process.argv);
//console.log(operation);
//console.log(params);

switch (operation) {
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
//my-tweets function: show last 20 tweets and when they were created
//create stubs - mark a place where you need to go to add things to

function doTweets() {
    /*console.log("doTweets is under construction");*/
    var client = new twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var trumpTweets = {
        screen_name: "realdondahlen"
    };
    client.get("statuses/user_timeline", trumpTweets, function (error, tweets, response) {

        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*");
                            
            }
        } else {
            console.log("error");
        }


    })

}


function doSpotify() {
    console.log("doSpotify is under construction");
}

function doIMDB() {
    console.log("doIMDB is under construction");
}

function doRandom() {
    console.log("doRandom is under construction");
}



//spotify-this-song:  shows artist, songs name, preview link of song, album song is from, defaults to Ace of Base


//movie-this: title of movie, year movie came out, IMDB rating of movie, Rotten Tomatoes rating of movie, country where movie was produced, language of movie, plot of movie, actors in movie

/*request("https://www.omdbapi.com/&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
      console.log("The movie's IMDB rating is:  " + JSON.parse(body).imdbRating);
  }
});*/

//title, year,imdbRating, 
//do-what-it-says:  will run the text inside of random.txt
