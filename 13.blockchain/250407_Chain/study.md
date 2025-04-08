# 5일차 실습: 체인 구현 및 TDD 실습 과제

> **“신뢰는 연결을 통해 증명된다.”**

## 실습 목표

- `Chain` 클래스의 구조를 이해하고 직접 구현해보기
- 테스트 코드 기반으로 체인의 신뢰 검증 흐름을 체험하기
- 코드를 통해 ‘신뢰의 축적’이라는 개념을 내재화하기

## 실습 문제 구성 (유도형 서술 방식)

---

### 실습 1. 체인을 처음 생성했을 때, 어떤 상태일까?

> 새로 생성한 체인은 어떤 상태일까요?  
> 블록이 몇 개인지, 어떤 블록이 들어 있는지,  
> 그 블록은 어떤 특성을 갖는지 관찰해보세요.

> **힌트**: 체인은 항상 일정한 시작점을 갖습니다.  
> 그 시작은 임의로 만들 수 없고, 이미 정의된 상태로부터 출발해야 합니다.

```ts
describe("실습 1 - 체인 초기 상태 관찰", () => {
  const chain = new Chain();

  it("체인의 길이는 몇일까?", () => {});
  it("가장 처음 블록의 높이는?", () => {});
  it("마지막 블록의 해시는 무엇과 같아야 할까?", () => {});
});
```

---

### 실습 2. 블록을 하나 추가하면 어떤 변화가 생길까?

> 새로운 데이터를 담은 블록을 하나 만들어봅시다.  
> 이전 블록과 어떤 연결고리를 가지고 있어야 체인에 올바르게 추가될 수 있을까요?  
> 체인의 상태가 어떻게 달라지는지 관찰해보세요.

> **힌트**: 블록은 단순히 뒤에 붙는 것이 아니라,  
> **"내가 누구로부터 왔는지"**를 증명해야만 합니다.

```ts
describe("실습 2 - 블록 추가 후 상태 변화 확인", () => {
  const chain = new Chain();
  const newBlock = Block.generateBlock(
    chain.latestBlock(),
    ["tx01"],
    chain.getAdjustmentBlock()
  );

  chain.addToChain(newBlock);

  it("블록을 하나 추가한 후 체인의 길이는?", () => {});
  it("추가된 블록에는 어떤 데이터가 들어갔는가?", () => {});
});
```

---

### 실습 3. 체인 안에서 원하는 블록을 찾으려면?

> 체인에 블록이 여러 개 추가되어 있는 상황입니다.  
> 특정 블록을 찾아야 하는데, 어떤 정보를 알고 있어야 직접 찾을 수 있을까요?

> **힌트**: 블록은 시간에 따라 차곡차곡 쌓입니다.  
> 때론 **몇 번째인지**, 때론 **식별 가능한 값이 무엇인지**를 아는 게 중요합니다.

```ts
describe("실습 3 - 조건 기반 블록 탐색", () => {
  const chain = new Chain();

  for (let i = 0; i < 3; i++) {
    const block = Block.generateBlock(
      chain.latestBlock(),
      [`tx${i}`],
      chain.getAdjustmentBlock()
    );
    chain.addToChain(block);
  }

  it("특정 높이에 있는 블록을 확인해보자", () => {});
  it("해시를 이용해서 블록을 찾아보자", () => {});
});
```

---

### 실습 4. 체인을 외부로 저장하고 다시 불러오면?

> 체인을 외부에 저장하고, 나중에 다시 불러와야 할 경우가 있습니다.  
> 이 과정을 직접 실험해보세요. 저장하기 전과 후의 체인은 완전히 같을까요?

> **힌트**: 저장은 결국 문자열이 되겠지만,  
> 복원한 체인이 같은지 확인하려면 **무엇을 비교해야 할지** 먼저 생각해보세요.

```ts
describe("실습 4 - 직렬화와 복원", () => {
  const chain = new Chain();

  for (let i = 0; i < 2; i++) {
    const block = Block.generateBlock(
      chain.latestBlock(),
      [`tx${i}`],
      chain.getAdjustmentBlock()
    );
    chain.addToChain(block);
  }

  const saved = chain.serialize();
  const recovered = chain.deserialize(saved);

  it("복원한 체인도 원본과 같을까?", () => {});
});
```

---

### 실습 5. 다른 사람이 더 많은 블록을 보내온다면?

> 나의 체인보다 더 많은 블록이 있는 체인이 다른 노드로부터 도착했습니다.  
> 이럴 땐 어떤 기준으로 교체 여부를 결정해야 할까요?  
> 직접 조건을 만들어 실험해보세요.

> **힌트**: 모든 체인이 무조건 교체 대상이 되는 건 아닙니다.  
> **더 길다 = 무조건 정답**이 아니라는 걸 기억하세요.  
> 교체의 핵심은 **신뢰할 수 있는 구조**인가입니다.

```ts
describe("실습 5 - 더 긴 체인과의 비교", () => {
  const myChain = new Chain();
  const otherChain = new Chain();

  for (let i = 0; i < 5; i++) {
    const block = Block.generateBlock(
      otherChain.latestBlock(),
      [`tx${i}`],
      otherChain.getAdjustmentBlock()
    );
    otherChain.addToChain(block);
  }

  const result = myChain.replaceChain(otherChain.get());

  it("교체가 일어났는가?", () => {});
  it("체인의 길이는 어떻게 되었는가?", () => {});
});
```
