import fetch from "node-fetch";

fetch("https://master.apis.dev.openstreetmap.org/api/0.6/changesets")
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    console.log(body);
  });
