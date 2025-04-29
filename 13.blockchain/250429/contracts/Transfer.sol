// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Transfer {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    // 입금: 누구나 가능
    function deposit() public payable {}

    // 출금: owner만, 원하는 주소에게 이더 송금
    function sendEther(address payable _to, uint _amount) public {
        require(msg.sender == owner, "Not owner");
        require(address(this).balance >= _amount, "Not enough balance");
        _to.transfer(_amount);
    }

    // 현재 잔액 확인용
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
