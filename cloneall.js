require('tillberg_common');
var jsdom = require('jsdom');
var request = require('request');
var url = require('url');
var async = require('async');

var username = process.argv[2];
if (!username) {
  console.log('Usage: node cloneall.js <username>');
  process.exit();
}
request({ uri: 'https://github.com/' + process.argv[2] }, function(err, response, body){
  if(err && response.statusCode !== 200){ console.log('Request error.'); }
  jsdom.env({
    html: body,
    scripts: ['http://code.jquery.com/jquery-1.6.min.js']
  }, function(err, window){
    //Use jQuery just as in a regular HTML page
    var $ = window.jQuery;
    var repos = [];
    $('.repo_list h3 a').each(function() {
      repos.push($(this).text());
    });
    async.forEachLimit(repos, 1, function(repo, cb) {
      var url = 'git@github.com:tillberg/' + repo + '.git';
      exec('git', ['clone', url], { cwd: './' }, function() {
        cb();
      });
    }, function() {
      console.log('Done');
    });
  });
});
