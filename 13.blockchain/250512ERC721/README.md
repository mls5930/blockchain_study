## 오늘 수업은 뭐할까?

오늘은 우리가 **진짜 NFT를 블록체인 위에 올리는 날**입니다.
그동안 배웠던 이론들—ERC-721의 철학, tokenId, tokenURI, 메타데이터, IPFS—
이제 전부 하나로 연결해서,
**“실제로 작동하는 NFT”**를 만들어봅니다.

그리고 단순히 스마트컨트랙트만 작성하는 것이 아니라,
그 NFT가 **진짜로 OpenSea에서 보이고**,
**누구나 그 정보를 읽을 수 있는 구조**까지 확인합니다.

## 오늘 수업의 목차

| 순서 | 주제                                            |
| ---- | ----------------------------------------------- |
| 1    | NFT는 그냥 이미지가 아니다 – 기술적 구조 복습   |
| 2    | `tokenId`, `tokenURI`, `_baseURI()`의 역할 구분 |
| 3    | 메타데이터(JSON)의 실제 구조와 의미             |
| 4    | IPFS와 CID 구조, 왜 필요한가?                   |
| 5    | Pinata를 활용한 이미지/JSON 업로드              |
| 6    | Remix에서 NFT 발행 → `tokenURI()` 연결 실습     |
| 7    | OpenSea에서 NFT 확인 및 `Refresh metadata` 이해 |

## 오늘 수업의 핵심

> **"NFT는 '고유한 객체'를 블록체인 위에 기록하는 구조이다."**

- `tokenId`는 단지 숫자일 뿐, 정체성은 `tokenURI()`가 가리키는 JSON에 있다.
- JSON은 **IPFS**에 올라가며, 그 주소는 내용 기반이므로 **무결성과 신뢰성**을 제공한다.
- OpenSea는 `tokenURI()`를 호출하여 메타데이터를 가져가고, 이를 시각적으로 표현한다.
- 따라서 오늘 우리는 **“정체성을 가진 디지털 자산”**을 직접 발급하고, 세상에 공개하는 경험을 하게 된다.
