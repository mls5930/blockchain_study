// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DAO.sol";

contract Factory {
    address[] private deployedDAOs;
    mapping(address => address[]) private createdBy;

    function createDAO() public {
        DAO dao = new DAO(msg.sender);
        deployedDAOs.push(address(dao));
        createdBy[msg.sender].push(address(dao));
    }
    // 내 안건들 뭔데?
    function getMyDAOs() public view returns (address[] memory) {
        return createdBy[msg.sender];
    }
    // 0번째 안건의 CA는 뭔데?
    function getDAO(uint index) public view returns (address) {
        require(index < deployedDAOs.length, "Invalid index");
        return deployedDAOs[index];
    }
}
