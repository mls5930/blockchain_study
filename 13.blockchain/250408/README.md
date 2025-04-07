l# 체인 구현 수업 흐름

해당 문서는 많이 어지럽습니다. ㅠ
어쩔 수 없습니다.

---

## 1. 이전 수업 기반 세팅

### 프로젝트 환경 복사

- 어제 수업의 `src` 폴더 전체를 통째로 복사합니다.
- 필요한 설정 파일도 함께 가져옵니다:

```bash
jset.config.ts
tsconfig.json
package.json
```

### 의존성 설치

```bash
npm install
```

---

## 2. 체인 추상화 만들기

> 체인은 여러 개의 블록이 쌓인 구조입니다.  
> 따라서 체인의 기본 기능부터 추상화(interface)로 정의합니다.

### `chain.interface.ts`

**경로**: `src/core/interface/chain.interface.ts`

```ts
import Block from "@core/block/block";

export interface IChain {
  get(): Block[]; // 전체 블록 반환
  length(): number; // 체인의 길이 반환
  latestBlock(): Block; // 가장 최근 블록 반환
}
```

### 구현 목표

- 체인의 핵심 단위는 `Block`
- 체인은 결국 `Block[]` 배열
- 필요한 기능:
  - 전체 체인 조회
  - 체인 길이 확인
  - 마지막 블록 가져오기

---

## 3. 체인 클래스 구현 시작

### `chain.ts`

**경로**: `src/core/chain/chain.ts`

```ts
class Chain implements IChain {}

export default Chain;
```

### 제네시스 블록 삽입

먼저 체인의 시작점인 **제네시스 블록**을 배열에 넣습니다.

```ts
import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { IChain } from "@core/interface/chain.interface";

class Chain implements IChain {
  private chain: Block[] = [GENESIS];
}

export default Chain;
```

---

### 체인 기능 구현 (IChain 구현하기)

```ts
import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { IChain } from "@core/interface/chain.interface";

class Chain implements IChain {
  private chain: Block[] = [GENESIS];

  // 체인의 전체 블록 반환
  get(): Block[] {
    return this.chain;
  }

  // 체인의 길이 반환
  length(): number {
    return this.chain.length;
  }

  // 체인의 가장 마지막 블록 반환
  latestBlock(): Block {
    return this.chain[this.length() - 1];
  }
}

export default Chain;
```

---

## 체인 클래스, 이렇게만 보면 뭐야?

지금까지 작성한 `get()` 메서드는 단순히

> **“현재 체인이 갖고 있는 블록 배열을 반환”**하는 기능입니다.

즉, **조회 기능**이죠.

---

하지만 단순히 코드만 봐서는  
"정말 이게 잘 작동하는지",  
"정말 체인 안에 제네시스 블록이 들어 있는지"  
확신할 수 없습니다.

그래서 **TDD(Test-Driven Development)**로 확인해보겠습니다.

---

## 첫 번째 TDD — 체인 초기 상태 검증

`Chain` 클래스의 가장 기본적인 동작부터 확인해봅니다.

```ts
import Chain from "@core/chain/chain";

describe("Chain 구현", () => {
  let chain: Chain;

  beforeEach(() => {
    chain = new Chain();
  });

  it("체인 조회하면, 제네시스 블록이 포함되어 있어야 한다.", () => {
    const blocks = chain.get();
    const blocksLength = chain.length();
    const latestBlock = chain.latestBlock();

    // 현재 체인은 배열인가?
    expect(Array.isArray(blocks)).toBe(true);

    // 현재 제네시스 블록만 존재하는가?
    expect(blocksLength).toBe(1);

    // 마지막 블록은 무엇인가?
    console.log(latestBlock);
  });
});
```

---

### 이 테스트가 검증하려는 것

1. **체인의 구조 확인**

   - `get()`을 통해 반환된 값이 **배열인가?**
   - `Block[]` 구조가 유지되고 있는가?

2. **초기 상태 검증**

   - `length()`를 통해 현재 체인 길이를 확인 → **1**이어야 함
   - 즉, 체인이 생성될 때 **제네시스 블록만 포함되어 있어야 함**

3. **가장 최근 블록 확인**
   - `latestBlock()`이 실제 블록 인스턴스를 잘 반환하는가?
   - 콘솔 로그로 블록 구조를 직접 확인해볼 수 있음

이제 `npm test` 또는 `npm run test`로 실행해보세요.  
**정상 통과된다면 → 체인 조회는 정상 동작 중!**

---

## 이제 다음으로 넘어가야 할 기능은?

조회는 완료했으니,  
이제부터는 **직접 블록을 체인에 추가**해보는 기능을 구현합니다.

---

## `addToChain()` 메서드 구현

**파일 위치**: `src/core/chain/chain.ts`

```ts
// 체인에 블록을 추가하는 메서드
addToChain(receivedBlock: Block): Block {
  this.chain.push(receivedBlock);
  return this.latestBlock(); // 가장 최근 블록 반환
}
```

> 현재 시점에서 이 기능은  
> “**블록이 채굴된 이후 체인에 저장되는 동작**”을 구현하는 것입니다.  
> → 즉, 채굴 → 체인 연결

---

## TDD 작성 — 블록을 체인에 추가하는 테스트

### 1. 필요한 모듈 불러오기

```ts
import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { GENESIS } from "@core/config";
```

### 2. 테스트용 데이터 준비

```ts
const data = ["tx01"];
```

### 3. 테스트 환경 구성

```ts
describe("Chain 구현", () => {
  let chain: Chain;
  let newBlock: Block;

  beforeEach(() => {
    chain = new Chain();
  });

  it("블록 채굴 이후 블록이 체인에 추가되었는가?", () => {
    // 1. 블록 채굴 (generateBlock)
    newBlock = Block.generateBlock(GENESIS, data);

    // 2. 체인에 추가
    const addedBlock = chain.addToChain(newBlock);

    // 3. 검증
    expect(chain.length()).toBe(2); // 체인 길이가 2가 되어야 함 (GENESIS + newBlock)
    expect(addedBlock).toEqual(newBlock); // 가장 최근 블록이 추가한 블록과 동일해야 함
    expect(chain.get()[1].previousHash).toBe(GENESIS.hash); // 해시 연결 확인
  });
});
```

---

### ✅ 테스트 의도

| 단계                           | 목적                                          |
| ------------------------------ | --------------------------------------------- |
| `generateBlock(GENESIS, data)` | 새 블록 채굴 (기존 블록 기반)                 |
| `addToChain(newBlock)`         | 체인에 블록 추가                              |
| `expect(...)`                  | 체인 길이 증가 / 연결 정상 여부 / 반환값 검증 |

---

## 생성됨 => 조회됨 => 길이확인 => 블록이 추가됨

그렇다면, 이제 다음을 고민할 차례

1. 블록을 그냥 추가해도 되는가?

어디로 가느냐

chain.ts?

아닙니다

block.ts로 갑니다

### 우리 수업에서는 이렇게 생각하세요:

- 지금 우리가 블록을 만들면 거의 바로 생성됨 (난이도 없음)
- 근데 실제로는 *마이닝 = 연산 문제 풀기*여야 함
- 그래서 **시간을 기준으로 난이도를 조절해야 함**

즉, 체인은 일정 간격으로  
**난이도를 높이거나**  
**낮추거나**  
🟰 그대로 유지할 수 있어야 합니다.

이 기능을 담당하는 메서드가  
바로 **`Block.getDifficulty()`** 입니다.

`../src/core/block/block.ts`

### 함수 선언부

```ts
static getDifficulty(_newBlock: Block, _adjustmentBlock: Block, _previousBlock: Block): number
```

| 파라미터           | 설명                       |
| ------------------ | -------------------------- |
| `_newBlock`        | 생성 대상 블록             |
| `_adjustmentBlock` | 난이도 기준 블록 (10개 전) |
| `_previousBlock`   | 마지막 블록 (이전 블록)    |

난이도 조정 규칙

새롭게 추가된 블록의 순번으로 따져요

그리고 난이도를 측정합니다.

### 난이도 조정 규칙 (우리 수업용 간이 버전)

1. 체인 길이 < 10 → 난이도 0
2. 체인 길이 < 21 → 난이도 1
3. 그 외에는:
   - 예상 시간보다 너무 빠르면 → 난이도 ↑
   - 너무 느리면 → 난이도 ↓
   - 아니면 유지

## 이 코드가 왜 필요할까?

```ts
if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) {
  return _previousBlock.difficulty;
}
```

### 핵심 질문:

> **모든 블록마다 난이도를 매번 다시 계산하면 안 되는 이유는?**

---

## 1. 난이도 조정은 _비용이 크다_

- 블록 하나 만들 때마다 전체 체인의 타임스탬프를 비교하며 난이도를 바꾸면,
- **불필요한 계산과 판단이 과도하게 발생**합니다.
- 성능 낭비, 예측 불가한 난이도 급변 등이 생길 수 있음.

---

## 2. 그래서 Satoshi는 “주기적 조정”을 택했다

비트코인 등 실제 블록체인에서는 다음과 같은 방식을 사용합니다:

- **n개 주기로만** 난이도를 조정함 (예: 비트코인은 2016개)
- 그 외의 블록은 **직전 블록의 난이도를 그대로 상속**

---

## 3. 이 코드는 바로 그 조건을 구현

```ts
if (_newBlock.height % 10 !== 0) {
  return _previousBlock.difficulty;
}
```

### 해석하면:

> “이번 블록이 조정 주기(DIFFICULTY_ADJUSTMENT_INTERVAL)의 배수가 아니면,  
> 난이도 조정 안 해! 그냥 이전 블록의 난이도 그대로 써!”

---

### 그런데… 왜 `10`이라는 숫자를 직접 쓰지 않고, `DIFFICULTY_ADJUSTMENT_INTERVAL` 같은 변수로 뺄까요?

> 그냥 `10`을 써도 되잖아요?  
> `"if (_newBlock.height % 10 !== 0)"` 이렇게요.

맞는 말처럼 보이지만, 우리는 **이 숫자에 '의미'를 부여하고 싶은 것**입니다.

---

### 숫자에 이름을 붙이면, 단순 숫자가 '규칙'이 됩니다

`10`이라는 숫자는 단순히 수학적 연산이 아니라

> **"몇 개의 블록마다 난이도를 조정할 것인가"**  
> 라는 **시스템의 정책**을 의미합니다.

그래서 이 숫자를 이렇게 표현하는 겁니다:

```ts
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
```

→ 이건 그냥 숫자가 아니라  
**"우리는 10개마다 난이도를 조정한다"**는  
블록체인의 **설계 의도를 담은 이름**입니다.

---

### 정리하자면

| 하드코딩     | 의미 부여된 상수                                   |
| ------------ | -------------------------------------------------- |
| `10`         | `DIFFICULTY_ADJUSTMENT_INTERVAL`                   |
| 숫자만 있음  | 의도와 정책이 드러남                               |
| 변경 시 위험 | 변경 시 전체 시스템이 일관성 있게 반영됨           |
| 읽기 어려움  | 읽는 순간 “아, 10개마다 조정하는구나!” 직관적 이해 |

---

### 그래서 우리는…

> “코드가 말하게 한다.”  
> 이게 유지 보수성과 가독성, 팀 작업에 있어 중요한 개발자의 습관입니다.

즉, **변수로 쓰는 건 ‘편의’ 때문이 아니라, '정책을 명시하는 행위’입니다.**

## 그런데 난이도는 어떻게 조정해야 할까?

우리는 앞에서 말했죠:

> “모든 블록마다 난이도를 조정하진 않고,  
> 일정한 주기(`DIFFICULTY_ADJUSTMENT_INTERVAL`)마다만 조정한다.”

자, 그럼 주기가 되었을 때 이제 고민해야 할 게 생깁니다:

---

## "이번엔 난이도를 높일까? 낮출까? 그대로 둘까?"

그 기준이 뭐죠?

> 얼마나 **빨리** 또는 **느리게** 블록이 생성되었는지입니다.

즉, 우리가 예상한 속도보다 너무 빨리 블록들이 채굴되면  
→ 난이도를 **올려야** 하고,

너무 느리게 생성되면  
→ 난이도를 **낮춰야** 합니다.

---

## 그래서 필요한 계산

```ts
const timeToken = _newBlock.timestamp - _adjustmentBlock.timestamp;
```

- **timeToken**  
  → `DIFFICULTY_ADJUSTMENT_INTERVAL` 개의 블록이  
   실제로 채굴된 데 걸린 시간입니다.

```ts
const timeExpected =
  BLOCK_GENERATION_INTERVAL * 10 * DIFFICULTY_ADJUSTMENT_INTERVAL;
```

- **timeExpected**  
  → 원래 예상했던 시간 (예: 블록 하나당 10초 \* 주기 개수)

---

## 그리고 조정 조건

```ts
if (timeToken < timeExpected / 2) return _previousBlock.difficulty + 1;
```

- 실제 채굴 속도가 **너무 빠르면**  
  → 블록이 남발되고 있다는 뜻 → **난이도 +1**

```ts
if (timeToken > timeExpected * 2) return _previousBlock.difficulty - 1;
```

- 채굴이 **너무 느리면**  
  → 시스템이 느려지고 있다는 뜻 → **난이도 -1**

---

## 이 코드는 왜 필요한가?

우리가 **디지털 금**을 만든다고 생각해보세요.  
채굴이 너무 쉽거나 어렵다면 시스템 전체가 불안정해집니다.

- **너무 쉬우면?**  
  → 블록 남발 → 보상 남발 → 인플레이션, 네트워크 불안정

- **너무 어렵다면?**  
  → 채굴 지연 → 거래 정체 → 사용자 불편

> 그래서 우리는 주기적으로 “실제 속도”와 “예상 속도”를 비교하여  
> **"지금 이 난이도가 적절한가?"를 판단**합니다.

---

## 요약

| 계산 항목               | 의미                    |
| ----------------------- | ----------------------- |
| `timeToken`             | 실제로 걸린 시간        |
| `timeExpected`          | 이상적인 시간           |
| 비교 결과 → 빠름        | → 난이도 +1 (더 어렵게) |
| 비교 결과 → 느림        | → 난이도 -1 (더 쉽게)   |
| 적절하면 아무 변화 없음 | → 기존 난이도 유지      |

---

## 이제 난이도를 계산해보자

우리는 지금 이 시점의 블록을 만들 때  
**어떤 난이도를 적용해야 하는지** 판단하려고 합니다.

그래서 아래와 같은 메서드를 호출하게 됩니다:

```ts
static getDifficulty(_newBlock: Block, _adjustmentBlock: Block, _previousBlock: Block): number
```

### 그런데 이 함수, 매개변수가 3개나 됩니다.

**각각 뭐고, 왜 필요한 걸까요?**

---

### 매개변수 설명

#### 1. `_newBlock: Block`

- 지금 막 만들려고 하는 **새로운 블록**
- 이 블록이 **현재 시점에서 몇 번째인지**(`height`)를 봐야
  → 난이도 조정 시점인지 판단 가능
- 그리고 `timestamp`도 필요함 (실제 채굴 시간)

#### 2. `_adjustmentBlock: Block`

- **DIFFICULTY_ADJUSTMENT_INTERVAL 주기 전의 블록**
- 즉, 이번 난이도 조정 주기의 **시작점**
- → 조정 간격 동안 **실제로 얼마나 시간이 걸렸는지** 계산하려면 필요

#### 3. `_previousBlock: Block`

- **직전 블록**
- 조정이 안 일어나는 경우는 이 블록의 `difficulty`를 그대로 따라감
- 그리고 조정이 일어날 경우에도, 기준이 되는 난이도는 이전 블록의 것

---

### 이 세 개가 모두 있어야 이런 로직이 가능해집니다:

```ts
// 1. 조정 주기 체크
if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) {
  return _previousBlock.difficulty;
}

// 2. 실제 시간 계산
const timeToken = _newBlock.timestamp - _adjustmentBlock.timestamp;

// 3. 기준과 비교해서 난이도 조정
if (timeToken < timeExpected / 2) return _previousBlock.difficulty + 1;
if (timeToken > timeExpected * 2) return _previousBlock.difficulty - 1;
```

---

### 요약하자면

> **난이도 조정은 “현재 상태”만 보고 할 수 없습니다.**
>
> “과거에 어떻게 흘러왔는지”,  
> “이전은 어떤 기준이었는지”,  
> “지금은 그 기준을 벗어났는지”
>
> 이 모든 맥락이 필요하기 때문에  
> **세 개의 블록이 모두 필요한 것**입니다.

## generateBlock메서드 매개변수 추가

- `_adjustmentBlock: Block`

```ts
    // 블록 추가 메서드
    static generateBlock(_previousBlock: Block, _data: string[], _adjustmentBlock: Block): Block {
        const generateBlock = new Block(_previousBlock, _data);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock
    }
```

지금 정적인 값으로 0으로 고정적임.

```ts
this.difficulty = 0; // difficulty는 임의로 0으로 넣겠음.
```

```ts
    constructor(_previousBlock: Block, _data : string[], _adjustmentBlock: Block) {
        // super => 이전 블록 생성자 함수 호출 때문에
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot<string>(_data);
        this.hash = Block.createBlockHash(this);
        this.nonce = 0;
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock); // difficulty는 임의로 0으로 넣겠음.
        this.data = _data;
    }
```

# 이제 진짜 블록을 만들어보자 — 난이도 포함

## `generateBlock()` 메서드가 바뀌었습니다

기존에는 단순히 `_previousBlock`과 `_data`만 받아 블록을 생성했지만,  
이제는 블록 생성 시점에서 **난이도(difficulty)**도 올바르게 계산해 넣어야 하기 때문에,  
`_adjustmentBlock` 매개변수가 추가되었습니다.

### 변경 전

```ts
static generateBlock(_previousBlock: Block, _data: string[]): Block
```

### 변경 후

```ts
static generateBlock(_previousBlock: Block, _data: string[], _adjustmentBlock: Block): Block
```

## constructor도 바뀌었습니다

블록의 생성자는 이제 난이도를 계산해 넣기 위해  
`Block.getDifficulty()`를 호출합니다.

```ts
constructor(_previousBlock: Block, _data: string[], _adjustmentBlock: Block) {
  super(_previousBlock);
  this.merkleRoot = Block.getMerkleRoot<string>(_data);
  this.hash = Block.createBlockHash(this);
  this.nonce = 0;
  this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock);
  this.data = _data;
}
```

실제로 블록체인 네트워크에서는 기준을 정하고 난이도를 조정합니다.
흐름에 대한 문서를 작성할테니, 나중에 공부 빡세게 하셔야합니다.

# 이제는 체인에서 '찾는' 기능이 필요하다

> 지금까지 우리는 단순히 `체인에 블록을 추가`하기만 했습니다.  
> 하지만 이제는, **체인 안에서 특정 블록을 “찾아야” 하는 시점**입니다.

---

## 왜 ‘찾기’ 기능이 필요할까?

앞으로 체인을 검증하거나,  
난이도 조정을 하거나,  
트랜잭션이 어느 블록에 들어갔는지 확인하려면,

→ **체인 안에서 특정 블록을 기준으로 로직을 실행해야** 합니다.

즉,

> **“블록을 찾아야만 다음 로직으로 넘어갈 수 있다.”**

---

## 그래서 필요한 메서드: `getBlock()`

```ts
getBlock(callbackFn: (block: Block) => boolean): Block {
  const findBlock = this.chain.find(callbackFn);
  if (!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
  return findBlock;
}
```

### 설명:

- 체인 내부를 순회하면서  
  `callbackFn` 조건을 만족하는 블록을 찾아 반환합니다.
- 못 찾으면 에러를 던짐

> 이건 **블록 조회의 '기반 도구'**입니다.  
> 즉, 이걸 기반으로 **다양한 조회 기능을 확장**할 수 있습니다.

## 블록 조회 기능 확장

### 1. 블록의 높이로 찾기

```ts
getBlockByHeight(height: number): Block {
  return this.getBlock((block: Block) => block.height === height);
}
```

### 2. 블록의 해시값으로 찾기

```ts
getBlockByHash(hash: string): Block {
  return this.getBlock((block: Block) => block.hash === hash);
}
```

---

> 지금은 흐름만 가볍게 따라갑니다.  
> 실제 블록체인 네트워크에서는  
> **2016개 블록마다 난이도 조정, 블록 탐색 최적화 등**  
> 훨씬 복잡한 구조로 발전합니다.

이 흐름은 단순히 코드를 작성하는 게 아니라,  
“**블록체인이 어떻게 시스템을 구성하고 있는가**”를 몸으로 익히는 과정입니다.

### TDD 테스트 – 조건 기반 블록 조회

**경로**: `src/core/_test/chain.test.ts`

```ts
it("체인에서 특정 높이의 블록을 조회할 수 있는가?", () => {
  const block0 = chain.getBlockByHeight(0);
  console.log("height 10 블록:", block0);
  expect(block0.height).toBe(0);
});

it("체인에서 특정 해시값의 블록을 조회할 수 있는가?", () => {
  const target = chain.getBlockByHeight(0);
  const findByHash = chain.getBlockByHash(target.hash);
  expect(findByHash.height).toBe(0);
});
```

## 체인 비교

replaceChain

### 왜 필요한가?

실제 블록체인은 여러 노드가 서로 다른 체인을 갖고 있을 수 있습니다.  
그렇다면 다음과 같은 문제가 발생합니다:

> **"내 체인보다 상대방 체인이 더 길어요. 그럼 내 체인을 바꿔야 할까?"**

이럴 때 사용되는 원칙이 바로:

> **롱기스트 체인 룰(Longest Chain Rule)**  
> 가장 긴 체인이 정답이다!

---

### 우리가 구현할 방식

우리는 단순한 토이 블록체인이기 때문에,  
**난이도 총합 대신 "길이"만 기준으로 비교**합니다.

실제 비트코인에서는 더 복잡한 비교(작업량 총합)이나  
우리는 다음과 같은 조건으로 구현합니다:

- 상대 체인의 마지막 블록 높이 > 내 체인 → 교체
- 그렇지 않으면 무시
- 체인의 유효성 검사는 생략하거나 추후 확장 가능

## 매개변수 설명

```ts
replaceChain(receivedChain: Block[]): { isError: boolean; value: string }
```

### `receivedChain: Block[]`

> 다른 노드(또는 외부)로부터 받은 새로운 체인입니다.

이 매개변수는 다음을 전제로 합니다:

- **네트워크에서 받은 체인**일 수 있습니다. (예: WebSocket, P2P 네트워크)
- **내가 가진 체인보다 더 길고**,
- **올바르게 연결되어 있어야(valid)**,
- **현재 내 체인을 교체할 수 있는 후보**입니다.

### 왜 이게 필요한가요?

블록체인은 네트워크 환경에서 각 노드가 서로 체인을 교환하며  
**"누가 더 신뢰할 수 있는 체인을 가졌는가"**를 비교합니다.  
이때 받은 체인을 기준으로 교체 여부를 결정하기 위해 이 인자가 필요합니다.

## 반환값 설명

```ts
{
  isError: boolean;
  value: string;
}
```

| 속성      | 설명                                |
| --------- | ----------------------------------- |
| `isError` | 교체 실패 여부 (`true`면 오류 발생) |
| `value`   | 성공 또는 실패 메시지 (이유 설명용) |

### 반환 예시

| 상황                 | 반환값                                                              |
| -------------------- | ------------------------------------------------------------------- |
| 체인이 유효하지 않음 | `{ isError: true, value: "유효하지 않은 체인입니다." }`             |
| 체인이 짧음          | `{ isError: true, value: "받은 체인이 기존보다 짧거나 같습니다." }` |
| 교체 성공            | `{ isError: false, value: "체인 교체 완료!" }`                      |

## 전체 요약

| 항목            | 설명                                  |
| --------------- | ------------------------------------- |
| `receivedChain` | 교체 대상으로 받은 외부 체인          |
| `isError`       | 교체에 실패했는지 여부                |
| `value`         | 실패 또는 성공 이유를 설명하는 메시지 |

## 자 리스트를 작성해봅시다.

### 체인을 교체할 것인가? `replaceChain()` 로직 설명

이 함수는 **외부에서 받은 체인(receivedChain)** 을  
**현재 내 체인(this.chain)** 과 비교해서  
**교체할지 말지를 결정**합니다.

---

### 로직 순서 요약

1. ✅ **상대방 체인의 마지막 블록을 가져온다**
2. ✅ **내 체인의 마지막 블록을 가져온다**
3. ✅ **체인의 길이를 비교한다**
4. ❌ **상대방 체인이 제네시스 블록만 있을 경우 → 에러**
5. ❌ **상대방 체인이 나보다 짧거나 같을 경우 → 에러**
6. ✅ **상대방 체인이 더 길다면 → 내 체인을 교체한다**

---

## 코드 + 설명

```ts
replaceChain(receivedChain: Block[]): { isError: boolean; value: string | undefined } {
  // 1. 상대방 체인의 마지막 블록을 가져온다
  const lastReceivedBlock: Block = receivedChain[receivedChain.length - 1];

  // 2. 내 체인의 마지막 블록을 가져온다
  const latestBlock: Block = this.latestBlock();

  // 3. 상대방 체인이 제네시스 블록밖에 없다면? → 교체 불가
  if (lastReceivedBlock.height === 0) {
    return { isError: true, value: "상대방 체인은 제네시스 블록밖에 없습니다." };
  }

  // 4. 상대방 체인이 내 체인보다 짧거나 같다면? → 무시
  if (lastReceivedBlock.height <= latestBlock.height) {
    return { isError: true, value: "상대방 체인이 현재 체인보다 짧거나 같습니다." };
  }

  // 5. 여기까지 왔다면 → 상대방 체인이 더 길다는 뜻! → 교체 진행
  this.chain = receivedChain;
  return { isError: false, value: undefined };
}
```

---

## 왜 이런 조건이 필요한가요?

| 조건                     | 이유                                                            |
| ------------------------ | --------------------------------------------------------------- |
| 제네시스 블록만 있다면?  | 유효한 체인이라고 보기 어렵기 때문입니다                        |
| 길이가 짧거나 같다면?    | 블록체인에서는 **더 길고 유효한 체인**을 따라야 하기 때문입니다 |
| 상대방 체인이 더 길다면? | 이론적으로 더 많은 작업이 들어간 체인 → 신뢰 가능성이 높음      |

---

### 반환 형식 설명

```ts
{
  isError: boolean; // 에러 발생 여부
  value: string | undefined; // 상태 메시지 (성공 시 생략 가능)
}
```

- `true`: 에러 발생 → 교체 실패
- `false`: 정상 처리 → 체인 교체 완료
- `value`: 실패/성공 이유를 문자열로 명시

---

우리가 지금까지 채굴한 블록들을 생각해봅시다.

> **지금 시점의 난이도(difficulty)** 를 조정하려면,  
> **"예전의 어떤 기준 블록"** 과 비교해서,  
> **실제로 걸린 시간**을 알아야 합니다.

---

### 그런데 이런 상황이 불편해지기 시작합니다:

- 지금 `n번째 블록`을 만들고 있음
- 근데 **“n - 주기(INTERVAL)번째 블록**을 찾고 싶어요
- 이걸 **매번 계산하거나 외부에서 받아오게 하면 번거롭고 위험함**

즉, 주기에 해당하는 변수도 선언해야 한다.

`../src/core/config.ts`

```ts
// 자주 사용하는 값을 상수로 정리

// 몇 개마다 난이도 조정할 것인가? (기준 블록 간격)
export const INTERVAL = 10;
// 조정 대상 구간 길이 (보통 INTERVAL과 동일)
export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
// 10개의 블록이 생성되는 데 걸리는 이상적인 시간 (초 단위)
export const BLOCK_GENERATION_INTERVAL = 10 * 60; // 10분
```

---

### 그래서 우리는 이렇게 생각합니다:

> "그 기준 블록을 자동으로 계산해주는 메서드를 만들자!"  
> → 그게 바로 `getAdjustmentBlock()`입니다.

---

## `getAdjustmentBlock()` 메서드 구현하기

### 1. 먼저 추상화부터

#### `IChain`에 추상화 선언

`../src/core/interface/chain.interface.ts`

```ts
getAdjustmentBlock(): Block;
```

### 2. 추상화 설명

이 메서드는 다음과 같은 역할을 합니다:

| 역할               | 설명                                          |
| ------------------ | --------------------------------------------- |
| 기준 블록 조회     | 지금 난이도 조정을 위한 기준이 되는 블록 반환 |
| 안전 장치 포함     | 블록이 아직 적을 경우 제네시스 블록 반환      |
| 난이도 계산의 기초 | `getDifficulty()`에서 이걸 기준으로 시간 비교 |

---

### 3. 코드 구현

```ts
getAdjustmentBlock(): Block {
  const currentLength = this.length();

  const adjustmentBlock: Block =
    currentLength < INTERVAL
      ? GENESIS
      : this.chain[currentLength - INTERVAL];

  return adjustmentBlock;
}
```

### 4. 왜 이렇게 만들었을까? (구현 순서대로 설명)

#### `const currentLength = this.length();`

- 현재 체인의 블록 개수 확인
- 기준 블록이 존재할 수 있는지 판단하기 위함

---

#### `currentLength < INTERVAL ? GENESIS : this.chain[currentLength - INTERVAL]`

- 만약 아직 `INTERVAL` 개만큼 블록이 쌓이지 않았다면?  
  → 기준 블록이 없으므로 **제네시스 블록**을 반환

- 그렇지 않다면?  
  → 체인에서 `현재 길이 - INTERVAL` 번째 블록을 기준으로 사용

---

- 이렇게 반환된 `adjustmentBlock`은  
  **현재 블록의 생성 속도**와 비교하여  
  난이도를 높일지/줄일지 결정하는 기준점이 됩니다.

## 마지막으로

블록체인은 단순히 혼자 동작하는 구조가 아닙니다.
여러 노드가 서로 체인을 전송하고 교환해야 하기 때문에,
→ 체인을 문자열로 바꿔서 주고받을 수 있어야 합니다.
=> 즉, "객체 <-> 문자열" 변환 기능이 필요합니다.

## 1. 직렬화 기능이란?

### 👉 `serialize()`

> 블록들의 배열(`Block[]`)을 **JSON 문자열로 변환**  
> 즉, `[Block, Block, Block]` → `'[{...}, {...}, {...}]'`

```ts
serialize(): string {
  return JSON.stringify(this.chain);
}
```

---

## 2.역직렬화 기능이란?

### 👉 `deserialize(chunk: string)`

> 외부에서 받은 JSON 문자열을 다시 **Block 배열로 변환**  
> 즉, `'[{...}, {...}]'` → `[Block, Block]`

```ts
deserialize(chunk: string): Block[] {
  return JSON.parse(chunk);
}
```

> ❗ 주의: 단순한 객체로 복원되므로 `Block` 클래스의 메서드는 포함되지 않음.  
> → **체인 유효성 검사 시 복원 후 검증 메서드로 재확인 필요**

---

## 3. 이게 난이도 조정 TDD에서 왜 중요해?

### 예시 상황:

> 우리는 체인을 100개 이상 쌓은 뒤,  
> 해당 체인을 네트워크로 전송하고,  
> 다시 받았을 때 **정상적으로 복원되는지**,  
> 그리고 **난이도 기준 블록도 올바르게 복원되는지**를 확인하고 싶다.

---

## 4. 테스트 코드 예시

```ts
it("📐 블록 난이도 조정 + 직렬화/역직렬화 확인", () => {
  const newChain = new Chain();

  // 블록 100개 채굴
  for (let i = 0; i < 100; i++) {
    const newBlock = Block.generateBlock(
      newChain.latestBlock(),
      [`tx${i}`],
      newChain.getAdjustmentBlock()
    );
    newChain.addToChain(newBlock);
  }

  // 난이도 기준 블록 확인
  console.log("🔧 난이도 기준 블록:", newChain.getAdjustmentBlock());

  // 직렬화 확인
  const serialized = newChain.serialize();
  console.log("📤 직렬화 결과:", serialized.slice(0, 100) + "...");

  // 역직렬화 확인
  const deserialized = newChain.deserialize(serialized);
  console.log("📥 역직렬화 결과 (첫 블록):", deserialized[0]);

  // 길이 비교
  expect(deserialized.length).toBe(newChain.length());
});
```

---

## 🧠 요약 흐름

```mermaid
graph TD
A[Block 생성 및 난이도 조정] --> B[체인 직렬화 serialize()]
B --> C[문자열 전송 시뮬레이션]
C --> D[역직렬화 deserialize()]
D --> E[정상 복원 + 길이 비교 + 기준 블록 확인]
```
