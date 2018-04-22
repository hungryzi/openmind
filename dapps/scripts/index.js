function addUser(user, add) {
    var temp = {
        user: user,
        address: add,
        pendingContributions: 0
    };
    localStorage.setItem(user, JSON.stringify(temp));
}

function saveAddress(user)
{
  var add= $("#"+user).val();
  addUser(user,add);
  renderContributorsTable();

}

function removeUser(user) {
    localStorage.removeItem(user);
}

window.WEI_PER_CONTRIBUTION = 2000000000;
window.getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

window.prepareTestData = function() {
    var contributors = [{
            user: "cuminh",
            address: "0x8b79eb559bb38d34794bd660e7ac884dd06a3550",
            pendingContributions: 0
        },
        {
            user: "tien",
            address: "0xd6c42E3CC471c1dEf204863D89366b1A5E4ccaDF",
            pendingContributions: 3
        },
        {
            user: "francis",
            address: "",
            pendingContributions: 23
        },
        {
            user: "jishnu",
            address: "",
            pendingContributions: 12
        },
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
    renderContributorsTable();
};

window.renderContributorsTable = function() {
    $("#contributorsTable tbody").empty();

  var contributorsCount = localStorage.length;
  for (var i = 0; i < contributorsCount; i++) {
    var user = localStorage.key(i);
    var contributor = JSON.parse(localStorage.getItem(user) || "null");

        var $row = $("<tr/>");
        $row.append($("<td/>").text(contributor.user));
        if (contributor.address) {
          $row.append($("<td/>").text(contributor.address));
        } else {
          $row.append($("<td/>").html('<input id="'+ contributor.user + '" type="text"><button type="button" class="btn btn-primary" onclick="saveAddress(\''+ contributor.user +'\')">Save</button>'));
        }

        $row.append($("<td/>").text(contributor.pendingContributions));

        $("#contributorsTable tbody").append($row);
    }
};


window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    // You have a web3 browser! Continue below!
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  var abi = [
    {
      constant: true,
      inputs: [],
      name: "totalPayments",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_contributor",
          type: "address"
        },
        {
          name: "_wei",
          type: "uint256"
        }
      ],
      name: "reportContributions",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "withdrawBalance",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "fund",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address"
        }
      ],
      name: "payments",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "_contributor",
          type: "address"
        },
        {
          indexed: false,
          name: "_balance",
          type: "uint256"
        }
      ],
      name: "NewPayment",
      type: "event"
    }
  ];

  var contractAddress = "0x0B7A6B985AaC5aec45EcBBb19B458b287456244c";
  web3.eth.defaultAccount = web3.eth.accounts[0];

  var OpenStreetMapPayments = web3.eth.contract(abi);
  var contract = OpenStreetMapPayments.at(contractAddress);

  window.updateContributions = function() {
    var response = [
      { user: "hungryzi", contributionsCount: getRandomInt(2) },
      { user: "cuminh", contributionsCount: getRandomInt(4) },
      { user: "tien", contributionsCount: getRandomInt(3) },
      { user: "francis", contributionsCount: getRandomInt(5) },
      { user: "jishnu", contributionsCount: getRandomInt(7) },
      { user: "cat", contributionsCount: getRandomInt(8) }
    ];

    parseResponse(response);
  };

  window.reportContributions = function(address, amount) {
    contract.reportContributions(address, amount, function(error, result) {
      console.log("done reportContributions", error, result);
    });
  };

  window.parseResponse = function(contributors) {
    contributors.forEach(function(contributor) {
      var user = contributor.user;
      var existing = JSON.parse(localStorage.getItem(user) || "{}");
      existing.pendingContributions =
        (existing.pendingContributions || 0) + contributor.contributionsCount;

      if (existing.address) {
        if (existing.pendingContributions > 0) {
          reportContributions(
            existing.address,
            existing.pendingContributions * WEI_PER_CONTRIBUTION
          );
          existing.pendingContributions = 0;
        }
      } else {
        existing.user = user;
      }

      localStorage.setItem(user, JSON.stringify(existing));
      renderContributorsTable();
    });
  };

  renderContributorsTable();

  $("#updateContributionsButton").on("click", function() {
    updateContributions();
  });
});
