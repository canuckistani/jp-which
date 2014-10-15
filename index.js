const { env } = require('sdk/system/environment');
const _ = require('lodash');
const executable = require('jp-executable');
const fs = require('sdk/io/fs');
const file = require('sdk/io/file');
const { defer } = require('sdk/core/promise');


let paths = env.PATH.split(':');

function which(binary, callback) {
  let deferred = defer();
  let found = _.unique(_.filter(paths, (path) => {
    let _path = file.join(path, binary);
    if (fs.existsSync(_path) && executable.sync(_path)) {
      return _path;
    }
  }));

  if (found.length === 0) {
    if (callback) {
      callback('No executable found: '+binary);
    }
    else {
      deferred.reject('No executable found: '+binary);
      return deferred.promise;
    }
    
  }
  else {
    if (callback) {
      callback(null, found[0], found);
    }
    else {
      deferred.resolve(found[0]);
      return deferred.promise;
    }
  }
}

module.exports = which;
