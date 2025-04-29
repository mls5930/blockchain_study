// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 private count;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
        count = 0;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "your not manager.");
        _;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
    function increment() public {
        count += 1;
    }
    function reset() public onlyOwner {
        count = 0;
    }
}
