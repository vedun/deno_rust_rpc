var addon = require("bindings")("build-node-addon-api-with-cmake");

exports.hello = addon.hello;
