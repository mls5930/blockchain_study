// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BaseballNFT is ERC721 {
    // toString() 메서드 등 uint256타입을 Strings타입 변환하게 할 수 있는 메서드
    // 공부 해두시면 좋아영
    using Strings for uint256;
    address public owner;
    mapping(uint256 tokenId => bool) public minted;
    uint256 private totalSupply = 0;
    uint256[] private allTokenIds;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function minting(uint tokenId) public {
        require(msg.sender == owner, "Only Owner can mint");
        // 민팅이 이미 된 tokenId에 대해서 방지를 하자 minted 선언
        require(!minted[tokenId], "Already Minted!");

        _mint(msg.sender, tokenId);
        minted[tokenId] = true;
        totalSupply += 1;
        // 모든 토큰 아이디들을 담는 배열값이 필요
        allTokenIds.push(tokenId);
        // 권한을 위임 받았는지 안받는지 => CA가
    }
    function isApprovedForAll() public payable {
        
    }
    function purchase(uint256 tokenId) public payable {
                require(minted[tokenId], "Token does not exist");
                address currentOwner = ownerOf(tokenId); // A 
                require(currentOwner != msg.sender, "You Already Own this token"); // A !== B
                require(
                    getApproved(tokenId) == address(this), //권한 비교 
                    "Contract not approver for transfer"
                );
                require(msg.value == 1 ether, "Price is 1 ether");
                // 이더 전송
                payable(currentOwner).transfer(msg.value);
                // 이 컨트랙트가 대신 소유권 이전
                // from, to, tokenId
                _transfer(currentOwner, msg.sender, tokenId);
        }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        // ipfs://bafybeibyhsauzyjgldi3eso5aos6hy5qqsxfqqhtunwflj6wmbssxnct4q/0.json
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenId.toString(), ".json")
                : "";
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeibyhsauzyjgldi3eso5aos6hy5qqsxfqqhtunwflj6wmbssxnct4q/";
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
    function getAllTokenIds() public view returns (uint256[] memory) {
        return allTokenIds;
    }
}
