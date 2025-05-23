// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PixelAnimal is ERC721 {
    address public owner;
    mapping(uint256 => bool) public minted;
    uint256 private tokenPublication = 0;
    uint256[] private tokenAll;
    using Strings for uint256;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    modifier onlyowner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function minting() public onlyowner {
        uint256 newTokenId = tokenPublication;
        _mint(msg.sender, newTokenId);
        tokenPublication += 1;
        minted[newTokenId] = true;
        tokenAll.push(newTokenId);
    }

    function TokenSale(uint256 tokenId) public payable {
        require(minted[tokenId], "token is not defined");
        address tokenOwner = ownerOf(tokenId);
        require(tokenOwner != msg.sender, "You already have a token.");
        require(msg.value == 1 ether, "Price is 1 ether");
        bool fullAuthority = isApprovedForAll(tokenOwner, address(this));
        if (fullAuthority) {
            payable(tokenOwner).transfer(msg.value);
            _transfer(tokenOwner, msg.sender, tokenId);
        } else {
            require(
                address(this) == getApproved(tokenId),
                "You don't have permission"
            );
            payable(tokenOwner).transfer(msg.value);
            _transfer(tokenOwner, msg.sender, tokenId);
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenId.toString(), ".json")
                : "";
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeigl7ydtup5wgd3jkdemfstoes6m64uynurk4ilzet57to23osnx6u/";
    }

    function getTokenall() public view returns (uint256[] memory) {
        return tokenAll;
    }
    function getTokenPublication() public view returns (uint256) {
        return tokenPublication;
    }
}
