var jsdom = require('jsdom');
var request = require('request');
var url = require('url');

console.dir(process.argv);
request({ uri: 'https://github.com/' + argv[1] }, function(err, response, body){
  
});