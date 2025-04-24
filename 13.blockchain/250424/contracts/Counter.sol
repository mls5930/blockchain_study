// 경로: 250424/contracts/Counter.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count;
    address private owner;

    constructor(address _owner) {
        count = 0;
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed.");
        _;
    }

    function increment() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function reset() public onlyOwner {
        count = 0;
    }
}
