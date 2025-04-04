## findblcok 내려오기까지 다 검증할거잖아요?

```ts
it("merkleRoot", () => {
  let data = ["tx01"];
  const merkleRoot = Block.getMerkleRoot<string>(data);
  // 1. 문자열인가?
  // 2. 해시의 기본 조건 => 64자리가 맞는가?

  // A가 B여야 한다   << 이 값이 이렇게 나와야 테스트 통과임
  // 통과 기준 => merkle의 타입이 string이어야 PASS
  expect(typeof merkleRoot).toBe("string");
  expect(merkleRoot.length).toBe(64);
});

it("findBlock", () => {
  const data = ["tx02"];
  const block = new Block(GENESIS, data);
  block.difficulty = 4;

  const result = Block.findBlock(block);
  console.log("findBlock", result);

  // nonce가 1 이상
  expect(result.nonce).toBeGreaterThan(0);
  // hash 길이 64
  expect(result.hash.length).toBe(64);
  // hash를 binary로 변환 시 0이 difficulty만큼?
  const binary = CryptoModule.hashToBinary(result.hash);
  expect(binary.startsWith("0".repeat(result.difficulty))).toBe(true);
});
```

```ts
expect(merkleRoot.length).toBe(64);
expect(result.hash.length).toBe(64);
```

위의 테스트 단위 => merkleRoot 단위에서 이미 머클 루트 길이가 64자리인걸 증명해서  
해시인것을 검증했는데
findBlock에서 굳이 검증 해야하나요? 저는 사실 그럴 필요가 없을 것 같아서  
뺐습니다.

## 교강사 답변: 필요하다면 해야겠죠?
