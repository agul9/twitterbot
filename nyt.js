//our twitter library
var Twit = require('twit');
//configuration file
var T = new Twit(require('./config.js'));
//request library
var request = require('request');

//function that gets an article related to weather from the new york times and tweets out the abstract and url link
function tweetArticle () {
    request('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=weather&api-key=yKQY5k4pG9hlEu9I6ND24ireqqnONnGS', function(err, response, data) {
        if (!err) {
            var json = JSON.parse(data);
            let url = json.response.docs[0].web_url;
            let summary = json.response.docs[0].abstract;
            T.post('statuses/update', { status: summary + ": " + url }, function(err, data, response) {
                if (!err) {
                    console.log("just tweeted an article!"); 
                }       
            });
        }
    })
}

//calls the tweetArticle function once a week.
//setInterval(tweetArticle, 604800000);
