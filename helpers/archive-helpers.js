var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function (err,data) {
    if (err) throw err;
    data = '' + data;
    console.log("exports.readListOfURLs data:", data);
    var siteList = [];
    for (var i = 0; i < data.length; i++) {
      if(data[i] === "\n") {
        siteList.push(data.slice(0,i)); // start here after lunch
        console.log("siteList", siteList);
        data = data.slice(i+1);
        i = 0;
      }
    }
    siteList.push(data);
    console.log("final sitelist", siteList);
    cb(siteList);
  } )
};

exports.isUrlInList = function(url, cb){
  var siteList = exports.readListOfUrls(function (read) {
    return read;
  });
  cb( _.contains(siteList, url) );
};

exports.addUrlToList = function(url, cb){
  if (exports.isUrlInList(url, function (x) {
    return x;
  })) {
    cb(false);
  } else {
    fs.appendFile(exports.paths.list, '\n' + url, function (err) {
      if (err) throw err;
      cb(true);
    })
  }

};

exports.isUrlArchived = function(url, cb){
  var archiveList = fs.readdir(exports.paths.archivedSites, function(err,archiveList) {
    if (err) throw err;
    return archiveList;
  });
  cb(_.contains(archiveList,url));
};

exports.downloadUrls = function(urlArray){
  for (var i = 0; i < urlArray.length; i++) {
    // if(exports.isUrlArchived(urlArray[i], function (x) {
    //   return x;
    // })) {
    //   continue;
    // }
    fs.open(exports.paths.archivedSites + "/" + urlArray[i], 'w', function (err, fd) {
      if (err) throw err;
      var buffer = 'i am the buffer, replace me LATTAAAAA'
      fs.write(fd, buffer , 0, buffer.length, function (err, written, buffer) {
        if(err) throw err;
        return;
      })
    })
  }
};








