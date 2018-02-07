require("dotenv").config();
require("./keys.js");
var fs = require('fs');
var request = require("request");
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var omdb = require("omdb");
var inquirer = require("inquirer");



//set up flow control

var operation = process.argv[2];
var params = "";
for (i = 3; i < process.argv.length; i++) {
    params = params + " " + process.argv[i];
}


switch (operation) {
    case "my-tweets":
        doTweets();
        break;
    case "spotify-this-song":
        doSpotify(params);
        break;
    case "movie-this":
        doIMDB(params);
        break;
    case "do-what-it-says":
        doRandom();
        break;

}
//tweets is working don't touch it

function doTweets() {
    var client = new twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

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

    request("http://www.omdbapi.com/?t=" + params + "=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        }
    });

}

function doRandom() {
    console.log("doRandom is under construction");
}
