"use strict";

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nodeFetch2.default)("https://master.apis.dev.openstreetmap.org/api/0.6/changesets").then(function (response) {
  return response.text();
}).then(function (body) {
  console.log(body);
});