const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

function startApp(web3) {
    const eth = new Eth(web3.currentProvider)
    const contract = new EthContract(eth)
    initContract(contract)
}

window.addEventListener('load', function() {
  // Check if Web3 has been injected by the browser:
  if (typeof web3 !== 'undefined') {
    // You have a web3 browser! Continue below!
    startApp(web3);
  } else {
     // Warn the user that they need to get a web3 browser
     // Or install MetaMask, maybe with a nice graphic.
     console.log(x.currentProvider);
     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
})

  web3.eth.defaultAccount = web3.eth.accounts[0];
  var CoursetroContract = web3.eth.contract([
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
]);
  var Coursetro = CoursetroContract.at('0x247c313128543052215d2e06172A4A2ef83a07c8');
  console.log(Coursetro);

  Coursetro.OpenStreetMapPayments(function(error, result){
    if(!error)
        {
            /* $("#instructor").html(result[0]+' ('+result[1]+' years old)'); */
            console.log(result);
        }
    else
        console.error(error);
  });

  $("#button").click(function() {
    Coursetro.OpenStreetMapPayments($("#name").val(), $("#donation").val(), (err, res) => {
    if (err) {
        // $("#loader").hide();
        console.log('oh no');
    }
    var nameOfDonator = $("#name").val();
    var para = document.createElement("div");
    var node = document.createTextNode("Thank for your donation, " + nameOfDonator);
    para.appendChild(node);
    var element = document.getElementById("div1");
    div1.appendChild(node);
  });
