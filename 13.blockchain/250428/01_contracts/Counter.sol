// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 private count;
    address public CAaddress;

    constructor(address _CAaddress) {
        CAaddress = _CAaddress;
        count = 0;
    }
    modifier onlyOwner() {
        require(msg.sender == CAaddress, "your not manager.");
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
