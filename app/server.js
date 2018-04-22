var express = require("express");
var app = express();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get("/", function(req, res) {
  res.send([
    { user: "hungryzi", contributionsCount: getRandomInt(12) },
    { user: "cuminh", contributionsCount: getRandomInt(32) }
  ]);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
