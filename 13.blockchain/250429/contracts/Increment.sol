// Increment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Counter.sol";

contract Increment is Counter {
    constructor(uint _initial, address _owner) Counter(_initial, _owner) {}

    function increment() public onlyOwner {
        count += 1;
    }
}
