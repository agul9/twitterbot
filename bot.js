// Our Twitter library
var Twit = require('twit');

//configuration file
var T = new Twit(require('./config.js'));

// search for the latest tweets on 'atlanta' and 'weather' hashtag.
var weatherSearch = {q: ('#weather atlanta'), count: 1, lang: 'en', result_type: "recent"}; 


// This function finds the latest tweet with the 'atlanta' and 'weather' hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', weatherSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

//this function gets a tweet with the same 'atlanta' and 'weather' hashtag and edits it by putting: "Weather Update! :" before the text of the tweet.
function editTweet() {
    T.get('search/tweets', weatherSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	//getting text of tweet
		var tweetTxt = data.statuses[0].text;
		//then tweet the text with the text we want to add
          T.post('statuses/update', { status: 'Weather update!: ' + tweetTxt}, function(err, data, response) {
            console.log("just tweeted something!");        
        });
	  }
	});
}

// Try to retweet something as soon as we run the program...
//retweetLatest();
//editTweet();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(retweetLatest, 1000 * 60 * 60);
