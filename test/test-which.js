let which = require('../index');

exports["test which"] = function(assert, done) {
  which('node').then(function(path) {
    assert.ok(path, 'got a path');
    console.log(path);
    done();
  });
};

require("sdk/test").run(exports);