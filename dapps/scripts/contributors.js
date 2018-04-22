window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.eth.defaultAccount = web3.eth.accounts[0];
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
  var OpenStreetMapPayments = web3.eth.contract(abi);
  var contract = OpenStreetMapPayments.at(contractAddress);

  window.getBalance = function() {
    contract.getBalance(function(error, result) {
      if (!error) {
        $("#balance").text(web3.fromWei(result, "ether"));
      } else {
        alert(error);
      }
    });
  };

  window.withdrawBalance = function() {
    contract.withdrawBalance(function(error, result) {
      console.log("done withdraw", error, result);
    });
  };

  window.reportContributions = function() {
    contract.reportContributions(
      web3.eth.defaultAccount,
      web3.toWei(0.03, "ether"),
      function(error, result) {
        console.log("done reportContributions", error, result);
      }
    );
  };

  var event = contract.NewPayment();
  event.watch(function(error, result) {
    if (!error) {
      console.log("NewPayment", result);
      var args = result.args;
      if (args._contributor === web3.eth.defaultAccount) {
        $("#balance").text(web3.fromWei(args._balance, "ether"));
      }
    } else {
      alert(error);
    }
  });

  getBalance();

  $("#claimButton").on("click", function() {
    withdrawBalance();
  });

  $("#reportContributionsButton").on("click", function() {
    reportContributions();
  });
});
