window.prepareTestData = function() {
  var contributors = [
    {
      user: "cuminh",
      address: "0x8b79eb559bb38d34794bd660e7ac884dd06a3550",
      pendingContributions: 0
    },
    {
      user: "tien",
      address: "0xd6c42E3CC471c1dEf204863D89366b1A5E4ccaDF",
      pendingContributions: 3
    },
    { user: "francis", address: "", pendingContributions: 23 },
    { user: "jishnu", address: "", pendingContributions: 12 },
    {
      user: "hungryzi",
      address: "0x21c6cdf87a4ceb0505eb83e4143d8d74449a7041",
      pendingContributions: 0
    }
  ];

  localStorage.clear();
  contributors.forEach(function(contributor) {
    localStorage.setItem(contributor.user, JSON.stringify(contributor));
  });
};

window.renderContributorsTable = function() {
  $("#contributorsTable tbody").empty();

  var contributorsCount = localStorage.length;
  for (var i = 0; i < contributorsCount; i++) {
    var user = localStorage.key(i);
    var contributor = JSON.parse(localStorage.getItem(user));

    var $row = $("<tr/>");
    $row.append($("<td/>").text(contributor.user));
    $row.append($("<td/>").text(contributor.address));
    $row.append($("<td/>").text(contributor.pendingContributions));

    $("#contributorsTable tbody").append($row);
  }
};

window.updateContributions = function() {
  var response = [
    { user: "hungryzi", contributionsCount: getRandomInt(2) },
    { user: "cuminh", contributionsCount: getRandomInt(4) },
    { user: "tien", contributionsCount: getRandomInt(3) },
    { user: "franscis", contributionsCount: getRandomInt(5) },
    { user: "jishnu", contributionsCount: getRandomInt(7) },
    { user: "cat", contributionsCount: getRandomInt(8) }
  ];

  parseResponse(response);
};

window.parseResponse = function(contributors) {
  contributors.forEach(function(contributor) {
    var user = contributor.user;
    var contributor = JSON.parse(localStorage.getItem(user) || "{}");

    if
  });
};

window.addEventListener("load", function() {
  renderContributorsTable();
});
