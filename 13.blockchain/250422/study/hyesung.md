# 오늘 뭐가 어려웠나?

## 왜 4단계 테스트가 계속 `PASS` 될까?

### 1. 이유: **매번 새로 배포되기 때문이에요.**

당신의 테스트 흐름은 이렇게 되어 있죠:

- **2단계**에서 스마트 컨트랙트를 **새로 배포**하고,
- **그 주소(CA)**를 `contractAddress`로 저장해요.
- **3단계, 4단계, 5단계**에서 이 주소로 다시 **컨트랙트를 연결해서 테스트**해요.

```ts
contractAddress = result.options.address; // 2단계에서 새로 배포
```

→ 테스트는 실행할 때마다 **매번 새로운 컨트랙트를 배포**하는 구조예요.

### 2. 그럼 무슨 일이 벌어지냐면?

```ts
expect(count).toEqual(1);
```

이 4단계는 **항상 "처음 increment()"를 호출하는 구조**가 되는 거예요.  
왜냐면 `getCount()`에서 참조하는 상태는  
**이전 테스트에서 쓰던 컨트랙트와 전혀 관련 없는 새로운 인스턴스**이기 때문이죠.

---

## 핵심 이해 포인트

> “**테스트가 독립적이기 때문에 상태가 이어지지 않는다.**”  
> 그리고 **테스트를 매번 실행할 때마다 Ganache의 상태는 유지되지만,  
> 우리가 배포하는 CA는 항상 새로운 상태다.**

---

## 이게 왜 중요하냐?

- 블록체인에서는 상태가 쌓이는 게 핵심인데,
- 테스트 환경에서는 **의도적으로 상태를 분리**하는 게 핵심이에요.

테스트에서 `beforeAll`을 쓴다든지, `describe` 블록을 나누든지 하는 이유도  
**의도적으로 ‘격리된 상태’에서 검증**을 하기 위해서예요.

---

## 정리

> “우리는 테스트마다 컨트랙트를 새로 배포하고 있어.  
> 즉, `increment()`를 실행한 컨트랙트와 `getCount()`를 실행한 컨트랙트는  
> ‘같은 주소’를 기반으로 하고 있지만, 매 테스트 실행마다 **새로운 배포**이기 때문에  
> **항상 상태가 0부터 시작**해서 `+1`된 결과만 검증하게 되는 거야.”

📌 그래서 **계속 테스트가 통과(PASS)** 되는 거야.

## 질문 핵심

> “왜 `increment()`를 호출했더니 블록이 하나 더 생겼을까?”

---

## 교강사 관점 정리

### 1. 비트코인 때 뭐라고 배웠지?

- **거래(Transaction)**를 모아
- **블록**에 넣고
- **채굴(Mining)**이 일어나면
- **새로운 블록이 생성된다**

그렇다면 이더리움은?

---

### 2. 이더리움은 채굴이 사라졌지만 “블록 단위 기록”은 유지됨

- 이더리움은 이제 **PoS(지분증명)** 기반이지만,
- 여전히 모든 **트랜잭션은 블록에 포함되어야 함**

즉,

> **트랜잭션을 날린다 → EVM이 실행 → 상태가 바뀜 → 블록에 저장됨**

---

### 3. 그래서 `increment()`는 단순한 함수 실행이 아니라…

```ts
await contract.methods.increment().send({ from, gas });
```

이건 실제로 **EVM 상태를 바꾸는 트랜잭션**이기 때문에

→ 블록에 **기록되어야 함**  
→ Ganache가 자동으로 **블록을 하나 더 생성**해줌

---

## 요약 정리

| 개념                    | 설명                                                |
| ----------------------- | --------------------------------------------------- |
| 함수 `call()`           | 읽기 전용. 상태 안 바뀜. 블록도 안 생김             |
| 함수 `send()`           | 상태 변경. 트랜잭션 발생. 반드시 **블록 생성**됨    |
| `getBlockNumber()`      | 블록이 하나 생길 때마다 번호가 하나 증가            |
| `increment()` 실행 결과 | 새로운 트랜잭션 → 새로운 블록 생성 → `블록 번호 +1` |

## 근데 6단계는 아직 검증 못했어요.

잘라야 해요

```ts
it("6단계:Contract Address로 내코드 검증 ", async () => {
  // EVM 에서 내가쓴코드를 주소값으로 검증?
  const web3 = new Web3("http://127.0.0.1:8545");
  const addressCode = await web3.eth.getCode(contractAddress);
  console.log(
    fs.readFileSync("./contracts_Counter_sol_Counter.bin").toString()
  );

  expect(addressCode.length).toBe(
    fs.readFileSync("../contracts_Counter_sol_Counter.bin").toString
  );
});
```

### 교강사 생각: 자른다고...? 그렇게 해서 검증이 안될걸

왜냐하면 공개키를 자른다고 주소가 되진 않아.
물론 내가 만든 수업에서는 간단하게 주소를 표현하기 위해서  
그렇게 한거지.

keccak256알고리즘과 연관이 있어.

## 정리

- **학생이 `getCode(contractAddress)`로 runtime bytecode를 받아와서**  
  `.bin`과 비교하려고 한 시도는 **매우 좋은 시도**입니다.

- 실제로 `getCode()`는 **EVM에 남겨진 실행 코드(runtime bytecode)**를 반환하고,  
  우리가 배포한 `.bin`은 **생성 코드(creation code)**를 포함한 전체 bytecode입니다.

- 즉, **비교 대상이 다르기 때문에** 단순 비교는 불가능하지만,  
  **접근 방식 자체는 정확했음**.

---

## 근데 왜 `.bin`만 가지고는 `.abi`를 만들 수 없을까?

### 1. ABI란 "외부에서 호출 가능한 함수의 인터페이스"예요.

- `function increment() public`
- `function getCount() public view returns (uint)`

이런 것들의 **함수명**, **매개변수 타입**, **반환값** 정보들이 모인 게 ABI입니다.

---

### 2. `.bin` (bytecode)에는 이런 인터페이스 정보가 없음

- bytecode는 **EVM이 실행할 수 있는 기계어 수준의 코드**일 뿐이에요.
- 함수 이름이나 파라미터 이름 같은 정보는 **이미 전부 해시(selector)** 되어 있어서,
  역으로 ABI를 복구할 수 없음.

예시:

```ts
function increment() → 0xd09de08a
```

이 `0xd09de08a`는 ABI의 일부 정보만 갖고 만든 4바이트 selector지,  
그 함수가 어떤 이름인지, 어떤 파라미터를 받는지는 알 수 없음.

---

## 결론: 왜 불가능한가?

> `.bin`은 실행 가능한 코드 덩어리일 뿐이고,  
> 그 코드가 **어떤 외부 인터페이스를 가졌는지는**  
> 오직 `.sol` 원본이나 `.abi`에만 있음.

즉, **bytecode → abi**는 불가능.  
반대로는 가능함. (sol → abi → bin)

---

## 만약 누군가 CA 주소만 주고 “여기 있는 함수 한번 써보세요”라고 했다?

- 해결 방법은 딱 하나: **ABI도 함께 제공해줘야 함**
- 아니면 Etherscan에서 "Contract ABI"를 수동 복사해서 써야 함

## 학생분이 정리한 구현 흐름

EVM 흐름 정리

EVM(Ethereum Virtual Machine)은 이더리움 블록체인 위에서 스마트 컨트랙트를 실행하는 가상 머신이다.
EVM에서 실행되는 코드는 보통 Solidity라는 언어로 작성된다.

1. EVM을 사용하려면 sol 이라는 :Solidity 언어를 사용해서 EVM에게 전달해줘야한다.

2. Solidity 에 sol 코드 작성

3. sol에서 작성한 코드를 solc 로 컴파일

4. npx - solc --abi ---bin (생성할 파일명)
   컴파일시 abi 와 betecode 파일이 나오게 된다.

5. 파일생성후 fs로 경로를 연결후 readfileSync로 읽어온다 단 abi 파일은 JSON 이기에 parse 해야함 bin 파일은 항상 0x를 붙어야함

6. EVM에서 실행되는 네트워크는여러가지가 있는데 그중 Ganache(우리 로컬에서만 돌아가는 가상이더리움 네트워크)를 설치

7. Ganache 실행
   npx Ganache
   실행시 각각 1000이더씩 가진 임의의 지갑 10개가 생성된다.

8. Ganache와 web3 의 연결
   new Web3(ganache 포트번호)

9. web3에서 주소를 가져옴

web3에서 eth 메서드를 사용 할수 있게됨

스마트 컨트렉트를 발행하려면 이더리움 환경에서 우리 컨트랙트를 사용하기위한 주소가 필요하기에
eth 는 이더리움 네트워크 메서드 getAccounts() 메서드를 사용해서 지갑 주소를 가져옴

10. web3에 우리가 sol에서 만든 코드를 contract 메서드로 넣음(abi)
    먼저 abi만 넣어서 가상의 컨트랙트를 생성합니다. 컴퓨터가 실행시키지 못함 따로 betecode를 넣어야 이걸 읽고 실행

11. 배포 만들어진 abi에 deploy 로 배포그릇 생성
    deploy 메서드로 data로 bytecode를 넣어서 배포 그릇 생성

12. 배포 만들어진 그릇에 스마트 컨트랙트를 만들 주소를 넣어서 컨트랙트를 발행
    contractAddress = result.options.address; 여기서 만들어진 주소가 우리의 컨트랙트를 사용하기 위한 주소

13. 배포 컨트랙스 사용
    기존에 컨트랙트를 만드는 Contract 메서드에 인자로 우리의 주소를 넣으면 우리가 만든 컨트랙트에 있는 코드를 사용가능

조회하는 메서드의 경우 주소값 없어도 호출이 가능

14. send 를 사용하여 트랜잭션이 발생하는 컨트랙트 실행

실제로 트랜잭션이 발생하는 코드를 실행시키려면
사용자의 주소도 받아와야한다.

Contract로 우리의 컨트랙트를 호출 => 트랜잭션의 경우 send 메서드와 함께 거래를 하려는 사람이 누구인가 주소와 , 예상 gas값을 넣어줘야함.
