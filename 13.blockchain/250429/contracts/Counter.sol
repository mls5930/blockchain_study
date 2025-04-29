// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count = 0;
    address private owner;

    constructor() {
        count = 2;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    // 3)
    function getCount() public view returns (uint) {
        return count;
    }

    function increment() public onlyOwner {
        count += 1;
    }
    function decrement() public onlyOwner {
        count -= 1;
    }
    // 4)
    function isOver(uint target) public view returns (bool) {
        if (count > target) {
            return true;
        } else return false;
    }
    function sum(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
