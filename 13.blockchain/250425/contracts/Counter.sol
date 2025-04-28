// 경로: 250424/contracts/Counter.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count; // 정수타입
    address public owner;

    constructor(address _owner) {
        owner = _owner;
        count = 0;
    }
    modifier onlyOwner() {
        // 미들웨어
        require(msg.sender == owner, "Only owner can call this"); //require 판단
        _; // _ 언더바는 부정 owner 가 아닐때 _ 를실행
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
