//twitter library
var Twit = require('twit');
//configuration file
var T = new Twit(require('./config.js'));
//request library
var request = require('request');

//function that uses wordnik to find an ajective, and we use it to create a unique tweet.
function weatherToday () {
    request('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=ovl32ourxdv4d7wc86co2biof0i48nka4fvdx0qmzge5q4ymn', function(err, response, data) {
        var json = JSON.parse(data);
        //console.log(json.word); 
        T.post('statuses/update', { status: 'The weather feels ' + json.word + ' today.'}, function(err, data, response) {
            console.log("just tweeted something!");        
        });
    })
}

//tweets out the top example on wordnik for the word 'temperature'
function topExample () {
    request('https://api.wordnik.com/v4/word.json/temperature/topExample?useCanonical=false&api_key=ovl32ourxdv4d7wc86co2biof0i48nka4fvdx0qmzge5q4ymn', function(err, response, data) {
        var json = JSON.parse(data);
        //console.log(json.text); 
        T.post('statuses/update', { status: json.text}, function(err, data, response) {
            console.log("just tweeted something!");        
        });
    })
}

//weatherToday();
//topExample();