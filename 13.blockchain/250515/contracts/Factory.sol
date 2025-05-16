// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DAO.sol";

contract Factory {
    // 모든 DAO 배포된 컨트랙트 주소 저장 상태
    address[] public deployedDAOs;
    // 각 EOA 가 낸 안건 => CA
    mapping(address => address[]) public createdBy;

    function createDAO() public {
        DAO dao = new DAO(msg.sender);
        deployedDAOs.push(address(dao)); //10번쨰 문서
        createdBy[msg.sender].push(address(dao));
    }
    function getMyDAOs() public view returns (address[] memory) {
        return createdBy[msg.sender];
    }
    function getDAO(uint index) public view returns (address) {
        require(index < deployedDAOs.length, "Inbalid index");
        return deployedDAOs[index];
    }
}
