require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");


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
//twitter api call
function doTweets() {
  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: "Code_Retro",
    limit: 20
  };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("TWEET TIME: ", tweets[i].created_at);
        console.log("TWEET TEXT: ", tweets[i].text);
      }
      console.log("Is this working?")
    } else {
      console.log("error");
    }
  });
};

function doSpotify(song) {
  var spot = new Spotify(keys.spotify);

  if (!song) {
    song = "All The Small Things"
  }
  spot.search({
      type: "track",
      query: song
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        var artists = songs[i].artists;
        var thisSong = songs[i].name;
        var url = songs[i].external_urls.spotify;
        var album = songs[i].album.name;
        for (var j = 0; j < artists.length; i++) {
          console.log("____________________________ ")
          console.log("Artist name: ", artists[j].name)
          console.log("Song name: " + thisSong)
          console.log("Song link: " + url);
          console.log("Album: " + album);
          break;
        }
      }
    }
  )
}

function doIMDB(params) {
  if (!params) {
    params = "The Last Unicorn"
  }
  request(
    "http://www.omdbapi.com/?t=" + params + "=&plot=short&apikey=trilogy",
    function (err, response, body) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Released: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log(
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
      );
      console.log("Produced in: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot Summary: " + JSON.parse(body).Plot);
      console.log("Starring: " + JSON.parse(body).Actors);
    }
  );
}

function doRandom() {
  console.log("doRandom is under construction");
}