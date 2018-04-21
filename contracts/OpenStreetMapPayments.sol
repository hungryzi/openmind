pragma solidity ^0.4.21;


import "./SafeMath.sol";
import "./PullPayment.sol";


/**
 * @title OpenStreetMapPayments
 * @dev A PullPayment contract which allows sponsors to fund it
 * and our scraper to create payments for contributors.
 */
contract OpenStreetMapPayments is PullPayment {
  using SafeMath for uint256;

  function fund() public payable {
    address(this).transfer(msg.value);
  }

  function getPayment(address _contributor) public view returns (uint256) {
    return payments[_contributor];
  }

  function reportContributions(address _contributor, uint256 _wei) public {
    asyncSend(_contributor, _wei);
  }
}
