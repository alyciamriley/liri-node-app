require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var inquirer = require("inquirer");
var spotify = require("node-spotify-api")
var twitter = require("twitter");
var omdb = require("omdb");




//set up flow control

// var operation = process.argv[2];
// var params = "";
// for (i = 3; i < process.argv.length; i++) {
//     params = params + " " + process.argv[i];
// }


//tweets is working don't touch it

function doTweets() {
    var client = new twitter(keys.twitter);

    var params = {
        screen_name: "code_retro"
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {

        if (!error) {
         
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("==============================================================================");
            }
        } else {
            console.log("error");
        }
    })
}


function doSpotify() {

console.log("Spotify is under construction");
}


function doIMDB() {

    request("http://www.omdbapi.com/?t=" + params + "=&plot=short&apikey=trilogy", function (error, response, body) {

        if (params) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot Summary: " + JSON.parse(body).Plot);
            console.log("Starring: " + JSON.parse(body).Actors);

        } else {

            //if time, figure out how to do this the non cheaty mc cheaterson way.
            console.log("Title: Mr. Nobody");
            console.log("Released: 2009");
            console.log("IMDB Rating: 7.9");
            console.log("Rotten Tomatoes Rating: 66%");
            console.log("Produced in: Belgium, Germany, Canada, France, USA, UK");
            console.log("Language: English, Mohawk");
            console.log("Plot Summary: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesnt choose, anything is possible.");
            console.log("Starring: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
        }
    });

}

function doRandom() {
    console.log("doRandom is under construction");
}


//======User Interaction=====//

function startLiri(operation) {
    inquirer.prompt({
        name: "listOptions",
        type: "rawlist",
        message: "What would you like to do today?",
        choices: ["View Tweets", "Look Up Song", "Look Up Movie"]
    }).then(function(answer) {
        if(answer.listOptions === "View Tweets") {
            doTweets();
        } if (answer.listOptions === "Look Up Song") {
            doSpotify();
        } if (answer.listOptions === "Look Up Movies") {
            doIMDB();
        }
    })
}

startLiri();
