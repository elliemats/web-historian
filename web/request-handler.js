var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var stream = fs.createReadStream(archive.paths.siteAssets + '/index.html')
  stream.pipe(res);
};
