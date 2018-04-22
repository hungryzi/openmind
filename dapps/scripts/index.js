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

  localStorage.setItem("contributors", JSON.stringify(contributors));
};

window.renderContributorsTable = function() {
  var contributors = JSON.parse(
    localStorage.getItem("contributors") || JSON.stringify([])
  );

  $("#contributorsTable tbody").empty();
  contributors.forEach(function(contributor) {
    var $row = $("<tr/>");
    $row.append($("<td/>").text(contributor.user));
    $row.append($("<td/>").text(contributor.address));
    $row.append($("<td/>").text(contributor.pendingContributions));

    $("#contributorsTable tbody").append($row);
  });
};

window.addEventListener("load", function() {
  renderContributorsTable();
});
