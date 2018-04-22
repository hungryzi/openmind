window.addEventListener('load', function() {
  // Check if Web3 has been injected by the browser:
  if (typeof web3 !== 'undefined') {
    // You have a web3 browser! Continue below!
    web3 = new Web3(web3.currentProvider);
  } else {
     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

const abi = [
  {
      "constant": false,
      "inputs": [],
      "name": "fund",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_contributor",
              "type": "address"
          },
          {
              "name": "_wei",
              "type": "uint256"
          }
      ],
      "name": "reportContributions",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "withdrawPayments",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getPayment",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "name": "payments",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalPayments",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  }
]

var contractAddress = "0x247c313128543052215d2e06172A4A2ef83a07c8";
web3.eth.defaultAccount = web3.eth.accounts[0];

$("#button").click(function() {
  var OpenStreetMapPayments = web3.eth.contract(abi);
  var contract = OpenStreetMapPayments.at(contractAddress);
  var getData = contract.fund.getData();
  console.log(getData)
  web3.eth.sendTransaction({
        to: contractAddress,
        from: web3.eth.defaultAccount,
        value: web3.toWei(parseFloat($("#donation").val()), "ether"),
        data: getData
      },
    function() {
      var nameOfDonator = $("#name").val();
      var value = $("#donation").val();
      console.log(value)
      var para = document.createElement("div");
      var node = document.createTextNode("Thank for your donation, " + nameOfDonator);
      para.appendChild(node);
      var element = document.getElementById("div1");
      div1.appendChild(node);
    }
  );
  });
});
