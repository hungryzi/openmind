window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.eth.defaultAccount = web3.eth.accounts[0];
  var abi = [
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
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "withdrawPayments",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getPayment",
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
    }
  ];
  var contractAddress = "0x247c313128543052215d2e06172A4A2ef83a07c8";
  var OpenStreetMapPayments = web3.eth.contract(abi);
  var contract = OpenStreetMapPayments.at(contractAddress);

  window.getBalance = function() {
    contract.getPayment(function(error, result) {
      if (!error) {
        $("#balance").text(JSON.stringify(result));
      } else {
        alert(error);
      }
    });
  };

  window.withdrawPayments = function() {
    contract.withdrawPayments(function(error, result) {
      console.log("done withdraw", error, result);
    });
  };

  window.reportContributions = function() {
    contract.reportContributions(web3.eth.defaultAccount, 2000, function(
      error,
      result
    ) {
      console.log("done reportContributions", error, result);
    });
  };

  getBalance();

  $("#claimButton").on("click", function() {
    withdrawPayments();
  });

  $("#reportContributionsButton").on("click", function() {
    reportContributions();
  });
});
