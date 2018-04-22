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

  address public owner;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  event NewPayment(
    address indexed _contributor,
    uint256 _balance
  );

  function OpenStreetMapPayments() {
    owner = msg.sender;
  }

  function fund() public payable {
  }

  function getBalance() public view returns (uint256) {
    return payments[msg.sender];
  }

  function withdrawBalance() public {
    withdrawPayments();
    emitNewPayment(msg.sender);
  }

  function reportContributions(address _contributor, uint256 _wei) onlyOwner returns (uint256) {
    asyncSend(_contributor, _wei);
    emitNewPayment(_contributor);
    return payments[_contributor];
  }

  function emitNewPayment(address _contributor) internal {
    emit NewPayment(_contributor, payments[_contributor]);
  }
}
