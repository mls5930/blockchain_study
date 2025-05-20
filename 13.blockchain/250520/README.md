## 태정님 음악 설문 평가 피드백 (교강사에게)

성향 취향이 맞아야 설문을 할 수 있다.라고 생각

=> 따라서 LLM을 집어넣는게 어떤가

넣고 싶은게

유저도 그렇고 내가 여태까지 해왔던

설문지에 대한 내역들

종합적인 그걸

다음 문단에 넣어서 고리를 만든다.

그 사람의 설문 정보  
=> 취향을 알 수 있고

흐름 자체를 가져가는 느낌

# 앞으로 일정

5월 21일: 월별 평가 (찐막)  
5월 22일 ~ 5월 27일: Toy Project 예정
6월 9일 ~ 7월 14일: 기업협업
7월 23일: 수료

평가가 3번입니다.

실전을 쌓을 수 있는 좋은 기회

앞으로 어떻게 해야 하는가?

0. 수업자료를 보지 않고, 특정 요구 사항에 필요한 지식을 어디까지 알고 있는지 글로서 표현하기
   => 메타인지
   => 그래야 내가 "어디가 빵꾸가 났고, 어떤 걸 공부해야 하는지 알 수 있음."

1. 내가 만든 프로젝트에 대한 흐름을 코드 없이 설명 가능
   => 흐름을 먼저 정의해야 한다.(글로써)

2. 데이터의 흐름 먼저 설계

스마트컨트랙트

프론트엔드

3. 화면에 대한 UX/UI를 그림으로서 표현하여 머릿속에 도식화해라.

# 목표 설정: 기본적인 NFT 마켓 플레이스 구현

기본적인 NFT 마켓 플레이스 구현하는데 있어서, 메타인지 체크.

내일 있을 월별 평가는 NFT 이미지는 상관없습니다.

여러분들의 귀여운 NFT를 마음껏 뽐내십시오.  
하지만, 구현하는데 있어서 마음껏 뽐내면 안됩니다.

## 목적 설정: 0번째 => 내가 무엇을 알고, 어떤걸 모르는가?

- 어떤 기술을 활용해서 기능을 구현할 수 있는데요?
- 마켓 플레이스는 뭐에요?

NFT 마켓 플레이스 => 얘에 대해서 어디까지 알고 있어요?

=> 얘에 대해서 알고싶은데, 어떤 질문을 하고 싶어?

- NFT는 뭔데요? => Non Fungible Token
  - Fungible Token => EIP-20 => ERC-20

그러면 얘도 토큰이고 ERC-721로 만든 NFT도 똑같은 토큰이겠네요?
그러면, ERC-20 토큰 하면 되는데 왜 굳이 ERC-721로 마켓 플레이스를 구현?
대체 불가능은 무슨 뜻인데요?

=> 가장 큰 차이점은 TokenId로 설명드릴 수 있겠습니다.
=> TokenId로서 파생되는 메타데이터들로 토큰을 사고 팔 수 있다는 개념을 체화시키는 프로젝트가
저는 NFT 마켓 플레이스라고 생각합니다.

- ERC-721에 대해서 어떤 메서드가 있습니까?

  - transferFrom
  - approve
  - ownerOf
  - balanceOf
  - AllowanceOf

- tokenId에 대비되는 메타데이터들은 어디에 저장되어 있습니까?

  - 이거 모르는거 같음. 명확하게 설명할 수 없는 수준임.
    => tokenURI 메서드를 모른다는거야.

- OpenSea 도대체 어떤 원리로 여러분들 ERC-721로 발행한 NFT들을 조회할 수 있습니까?

  - 주소 => CA를 검색창에 입력하면 나오겠지
  - 왜 주소창에 어떤 원리로 NFT가 나오냐고
    - ERC-721 솔리디티 파일로 예로 들면 상태가 존재하잖아요?
    - OpenSea는 어떤 상태를 참고해서 어떤 메서드를 호출해서 내 NFT를 조회할 수 있는겁니까?

transferFrom
\_transfer
\_mint
safeMint
safeTransferFrom
setApproveForAll
isApproveForAll
approve
ownerOf
balanceOf
AllowanceOf

위의 메서드를 통해서, 기본적인 마켓 플레이스의 흐름을 설명해보세요.

민팅부터, 판매까지

1. 특정 주소를 가진 유저가 입장합니다.
2. 지갑 연결부터 합니다.
3. 민팅 버튼이 존재하면 (mint, safeMint), 누릅니다.
4. 메타마스크 서명 컨펌 팝업창이 뜹니다.
5. 컨펌 버튼 누릅니다.
6. 판매하기 버튼을 누릅니다. (approve)
7. 마켓 플레이스에게 권한을 넘기고
8. 내껀지 확인하는 버튼을 누른다.
9. 내 NFT에 대한 정보가 나온다.
10. 메타마스크에서 주소를 변경한다
11. 지갑 연결한다.
12. NFT 목록 버튼을 누른다.
13. 특정 NFT를 구매하기 버튼을 누른다.
14. 메타마스크 컨펌창 뜸.
15. 내 잔액을 확인한다.
    15-1. 잔액이 충분하면, 특정 함수를 호출시켜서 구매합니다. (require or modifier)

모든 NFT 판매하도록 한꺼번에 내놓기

setApproveForAll()  
isApproveForAll() == true

---

## 총평

- tokenId에 대비되는 메타데이터들은 어디에 저장되어 있습니까?

  - 명확히 설명할 수 없음

- OpenSea 도대체 어떤 원리로 여러분들 ERC-721로 발행한 NFT들을 조회할 수 있습니까?

  - 명확히 설명할 수 없음

이 부분을 잘 모르는 것 같음.

내가 무엇을 모르고, 공부하면 좋습니까?

# **내가 무엇을 모르는가 – 정리와 해답 방향**

## 1. **tokenId에 대비되는 메타데이터들은 어디에 저장되어 있습니까?**

### 🔍 **당신이 지금 모르는 것**

- `tokenId`만 있지, **그 tokenId가 어떤 이미지, 이름, 설명과 연결되어 있는지**는 모름
- 즉, “**이 tokenId는 어떤 NFT인가요?**”에 대한 답을 못 함

### ✅ **공부 방향**

- **tokenURI(uint256 tokenId)** 함수에 대해 명확히 이해해야 함

  - 반환값은 `string memory` 타입의 **메타데이터 URI**
  - 일반적으로 IPFS 주소: `ipfs://Qm.../1.json` 같은 구조

- 그 URI에 있는 JSON의 구조:

```json
{
  "name": "My NFT #1",
  "description": "A cute NFT",
  "image": "ipfs://Qm.../image.png"
}
```

- 이걸 기반으로 OpenSea나 React 화면이 “어떤 NFT인지”를 보여주는 것임

### 핵심 정리

- NFT의 진짜 정보는 `tokenURI()`가 가리키는 외부 JSON에 있음
- 스마트컨트랙트에는 **직접적인 이미지나 이름 정보가 없음**

---

## 2. **OpenSea는 어떤 원리로 여러분들의 NFT를 조회할 수 있습니까?**

### **당신이 지금 모르는 것**

- "OpenSea가 어떻게 내가 만든 NFT 정보를 읽지?"라는 질문에 답을 못 함
- 특히, 왜 `CA 주소`만으로 OpenSea에서 목록이 뜨는지 구조를 모름

### **공부 방향**

OpenSea는 **ERC-721 인터페이스 표준**을 기반으로 다음 조건을 만족하는 CA라면 자동 인식함:

- `totalSupply()` 또는 `tokenOfOwnerByIndex()`: 토큰의 개수 확인
- `tokenURI(tokenId)`: 메타데이터 확인
- `ownerOf(tokenId)`: 소유자 확인

즉, OpenSea는 이런 구조로 작동:

```
1. 사용자가 특정 NFT CA 주소를 입력
2. OpenSea는 이 CA가 ERC-721 인터페이스를 구현했는지 확인
3. 구현되었다면, 토큰 개수를 추적하고 → 각각의 tokenId에 대해
   - tokenURI 호출
   - 해당 JSON에서 image, name 읽기
   - ownerOf(tokenId)로 현재 소유자 확인
4. 결과를 웹 UI에 렌더링
```

### 핵심 정리

- OpenSea는 **tokenURI**, **ownerOf**, **balanceOf** 등 ERC-721 필수 메서드들로만 모든 데이터를 조회함
- 데이터는 모두 블록체인에 있거나 외부 IPFS에 있음

---

## 3. **구현 흐름을 모두 아는 것 같은데, 실제로 “위임”과 “판매”는 분리되어야 한다는 개념은 체화되어 있는가?**

### **의심 포인트**

- `approve()`는 단순히 “**위임**”이지, 판매는 아님
- Marketplace에서는 보통 `Listing`(판매등록) 기능이 따로 있음

### **공부 방향**

- `approve()`는 NFT 전송 권한만 위임
- 그걸 받아서 Marketplace 컨트랙트가 실제 `transferFrom()` 또는 `safeTransferFrom()`으로 구매자에게 전송
- 따라서 Marketplace는 내부에 아래와 같은 구조를 가질 수 있음:

```solidity
mapping(uint256 => uint256) public prices;
function listForSale(uint256 tokenId, uint256 price) public {
    require(ownerOf(tokenId) == msg.sender, "Not owner");
    prices[tokenId] = price;
}
function purchase(uint256 tokenId) public payable {
    require(msg.value == prices[tokenId], "Incorrect price");
    address seller = ownerOf(tokenId);
    require(
        getApproved(tokenId) == address(this) ||
        isApprovedForAll(seller, address(this)),
        "Not approved"
    );
    payable(seller).transfer(msg.value);
    safeTransferFrom(seller, msg.sender, tokenId);
}
```

## 결론 – 지금 가장 필요한 공부 리스트

| 항목                     | 내용                              | 설명 수준              |
| ------------------------ | --------------------------------- | ---------------------- |
| `tokenURI`               | tokenId에 따른 메타데이터 위치    | ❌ 모름 → 공부 필요    |
| NFT 메타데이터 JSON 구조 | name, image, description 구조     | ❌ 명확하지 않음       |
| OpenSea 동작 원리        | 어떤 메서드들 호출해서 렌더링?    | ❌ 근거 없음           |
| approve vs 판매          | 단순 위임과 거래 구분             | ⚠️ 부분 체화           |
| Marketplace 기본 구조    | 판매등록(listing), 구매(purchase) | ⚠️ 구현 예시 연습 필요 |

## 추천 학습 순서

1. `tokenURI()` → IPFS → JSON 구조 분석
2. OpenSea에 내 NFT 올려보기 (수동 등록 없이 자동 조회되는 원리 파악)
3. approve와 transferFrom 관계 정리
4. Marketplace 컨트랙트 직접 작성 (list + purchase)
5. 프론트엔드에서 flow 정리 (판매 등록 → 구매)

## 위의 순서를 지키면서 비로소 공부에 들어간다면

시간이 별로 안걸림 ㄷㄷ

3시간은 아낌

왜? 내가 뭘 모르는지 어디에 빵꾸가 났는지 명확하게 알기 때문에 해당 지식에 대해서 더 집중하게 됨.

그리고 기존에 알고 있는 지식들은 보기만해도 어느 정도 납득을 함.

그리고 뭐해?

## 컨트랙트 작성해야지

컨트랙트 작성했다고 치자

## 화면 구현? ㄴㄴ 그림으로 표현

1. 메인페이지에 들어옴

   - 지갑 연결
     - 버튼 존재
     - 주소 텍스트 값
   - NFT 민팅 영역
     - 버튼
   - 내 NFT 목록
     - 목록 조회 버튼
     - 목록 이미지
       - 판매하기 버튼
       - tokenId
       - NFT 이름
   - 전 NFT 목록
     - 목록 조회 버튼
     - 목록 이미지
       - 구매하기 버튼
       - tokenId
       - NFT 이름
