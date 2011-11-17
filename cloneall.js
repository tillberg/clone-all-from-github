var jsdom = require('jsdom');
var request = require('request');
var url = require('url');

var username = process.argv[2];
if (!username) {
  console.log('Usage: node cloneall.js <username>');
  process.exit();
}
request({ uri: 'https://github.com/' + process.argv[2] }, function(err, response, body){
  if(err && response.statusCode !== 200){ console.log('Request error.'); }
});