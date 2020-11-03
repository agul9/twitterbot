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

//uses the word from relatedWord function to return the top example of that word
function topExample (word) {
    request('https://api.wordnik.com/v4/word.json/' + word +'/topExample?useCanonical=false&api_key=ovl32ourxdv4d7wc86co2biof0i48nka4fvdx0qmzge5q4ymn', function(err, response, data) {
        if (!err) {
            var json = JSON.parse(data);
            //if the text is longer than a tweet then it ends with "..."
            if ((json.text).length < 280) {
                //let str = (((json.text).substring(0,275)) + "..."); 
                T.post('statuses/update', { status: (((json.text).substring(0,275)) + "...")}, function(err, data, response) {
                    if (!err) {
                        console.log("just tweeted something!");
                    }        
                });
            } else { //if text can fit as a tweet it simply tweets the whole text
                //let str = (json.text); 
                T.post('statuses/update', { status: json.text}, function(err, data, response) {
                    if (!err) {
                        console.log("just tweeted something!");
                    }        
                });
            }
        }
    })
}

//finds a word related to weather and calls the topExample function
function relatedWord () {
    request('https://api.wordnik.com/v4/word.json/weather/relatedWords?useCanonical=false&relationshipTypes=same-context&limitPerRelationshipType=17&api_key=ovl32ourxdv4d7wc86co2biof0i48nka4fvdx0qmzge5q4ymn', function(err, response, data) {
        if (!err){
            var json = JSON.parse(data);
            //console.log(json);
            //picks a random word in the word list
            let x = Math.floor(Math.random() * 18);
            console.log(json[0].words[x]);
            topExample(json[0].words[x]); 
        }
    })
}

//once a day calls weatherToday function
//setInterval(weatherToday, 86400000);
//once every 2 days calls relatedWord function
//setInterval(relatedWord, 172800000);
