// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract DAO2 {
    address private master;

    constructor() {
        master = msg.sender;
    }
    modifier onlychairoerson() {
        require(msg.sender == master, "Only chairperson allowed");
        _;
    }
    struct presidentialVote {
        string title;
        uint number1;
        uint number2;
        uint number3;
        bool elected;
        mapping(address => bool) voted;
    }

    function createProposal(s) public {}
}
