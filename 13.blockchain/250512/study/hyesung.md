# 오늘 뭐가 어려웠나?

문서는 다 보았지만, 실습을 진행할때마다 렉이 자주 걸림.  
메서드들을 모르겠다.

1. ERC-20과 ERC-721의 가장 큰 차이점은?

tokenId가 존재하냐 안하냐

2. Non fungible token => 대체 불가능하다고 표현하는건지

0 => 타자
1 => 포수

3. ownerOf

ownerOf(uint256 tokenId) returns (address memory) {
return \_owners[tokenId];
}

mapping(uint256 tokenId => address) private \_owners;

\_owners : {
"0" : "0x...."
}

balanceOf(address owner) returns(uint256) {

}

mapping(address owner => uint256) private \_balances;

\_balances : {
"0x...." : 5 // 이 주소가 가지고 있는 토큰들의 갯수 // 4, 7, 9, 10, 13
}

0, 1, 2, 3

NFT

getBalance()
