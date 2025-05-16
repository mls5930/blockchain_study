// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Count {
    uint public count;

    function increment() public {
        count += 1;
    }
}
