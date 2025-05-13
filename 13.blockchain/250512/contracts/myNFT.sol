<<<<<<< HEAD
=======
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract myNFT is ERC721 {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}
    // 내가 정의한 내용
    mapping(uint256 tokenId => string tokenURI) _tokenURIs;
    uint256 private totalSupply = 0;
    // ipfs//bafybeidnx45v5rdnfdjxzbzrmjkggemfe4vfdcnvnoyyfxfk3knuzgefxq/1.json
    function minting(string memory uri) public {
        _tokenURIs[totalSupply] = uri;
        // erc721 내장 메서드 mint
        _mint(msg.sender, totalSupply);
        totalSupply += 1;
    }
    // 기존 ERC721.sol에 내장되어있던 메서드를 내가 새롭게 정의해서 작성한 메서드
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
    // 기존 ERC721.sol에 내장되어있던 메서드를 내가 새롭게 정의해서 작성한 메서드
    // 너의 NFT들의 기본 URI 가 어떻게 되누?
    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeidnx45v5rdnfdjxzbzrmjkggemfe4vfdcnvnoyyfxfk3knuzgefxq/";
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
}
>>>>>>> c8f5360163d4d7e4355900986466ed4c37b6dde3
