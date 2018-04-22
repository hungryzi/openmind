const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

  function startApp(web3) {
    const eth = new Eth(web3.currentProvider)
    const contract = new EthContract(eth)
    initContract(contract)
  }
  if (typeof web3 !== 'undefined') {
      startApp(web3);
  } else {
      // set the provider you want from Web3.providers
      console.log(x.currentProvider);
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  web3.eth.defaultAccount = web3.eth.accounts[0];
  var CoursetroContract = web3.eth.contract([{
  "constant": false,
  "inputs": [
    {
      "name": "_fName",
      "type": "string"
    },
    {
      "name": "_donation",
      "type": "uint256"
    }
  ],
  "name": "setInstructor",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getInstructor",
  "outputs": [
    {
      "name": "",
      "type": "string"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}]);
  var Coursetro = CoursetroContract.at('Contract: 0x247c313128543052215d2e06172A4A2ef83a07c8');
  console.log(Coursetro);

  // Coursetro.getInstructor(function(error, result){
  //   if(!error)
  //       {
  //           /* $("#instructor").html(result[0]+' ('+result[1]+' years old)'); */
  //
  //           console.log(result);
  //       }
  //   else
  //       console.error(error);
  // });

  $("#button").click(function() {
    //Coursetro.setInstructor($("#name").val(), $("#donation").val());
    var nameOfDonator = $("#name").val();
    var para = document.createElement("div");
    var node = document.createTextNode("Thank for your donation, " + nameOfDonator);
    para.appendChild(node);
    var element = document.getElementById("div1");
    div1.appendChild(node);
  });
