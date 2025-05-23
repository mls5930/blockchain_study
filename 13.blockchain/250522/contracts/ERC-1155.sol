// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ERC1155Study is ERC1155 {
    address private owner;
    uint256 public dog = 0;
    uint256 public cat = 1;
    uint256 public pang = 2;
    uint256 public rabbit = 3;
    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    // "ipfs://bafybeieiwtzekv5tj2wd7dpmvaqjjtabinrnlsc5f6l5322c33j6ntdtwy/{id}.json"
    constructor(string memory _uri) ERC1155(_uri) {
        owner = msg.sender;
    }

    function yourpet(address you, uint256 id, uint256 amount) public onlyOwner {
        _mint(you, id, amount, "");
    }
}

// 메서드	설명	ERC-20/721과 비교
// safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)	특정 토큰 ID의 수량만큼 전송	ERC-721은 1개씩, ERC-1155는 여러 개 가능

// safeBatchTransferFrom(...)	여러 종류(ID)의 토큰을 한 번에 전송	ERC-721/20에는 없음

// balanceOfBatch(...)	여러 주소/ID에 대한 잔액을 한꺼번에 조회	ERC-721은 단일 조회만 가능

// setApprovalForAll()	모든 토큰에 대해 일괄 승인	ERC-20은 approve() 하나만, 1155는 통합

// uri(uint256 id)	각 토큰 ID별 메타데이터 URL	ERC-721은 tokenURI()
