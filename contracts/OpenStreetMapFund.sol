pragma solidity ^0.4.21;


import "../math/SafeMath.sol";


contract OpenStreetMapFund {
  using SafeMath for uint256;

  // Address where funds are collected
  address public wallet;

  // Rate to convert contribution to ETH
  uint256 public rate; // 1,000,000

  // OpenStreetMapPayments contract
  OpenStreetMapPayments paymentsContract;

  function OpenStreetMapFund(address _wallet, address _paymentsContract, uint256 _rate) {
    wallet = _wallet;
    paymentsContract = OpenStreetMapPayments(_paymentsContract);
    rate = _rate;
  }

  function fund() public {
    wallet.transfer(msg.value);
  }

  function reportContributions(address _contributor, uint256 _contributionsCount) public {
    paymentsContract.asyncSend(_contributor, _contributionsCount / _rate);
  }
}
