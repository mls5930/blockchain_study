## 오늘 수업은 뭐할까?

지난 시간, 우리는
**EIP, ERC, Truffle, ERC-20, ERC-721**
이 다섯 가지 키워드를 과제로 정리해오기로 했습니다.

이 개념들은 앞으로 우리가 스마트 컨트랙트를 구현할 때
**코드 이전에 반드시 이해하고 넘어가야 할 설계 철학**이기도 하죠.

---

오늘부터 본격적으로 **ERC-20 토큰의 내부 구조를 직접 구현**해봅니다.

> “토큰이란 무엇이고, 왜 필요한가?”
> “토큰은 어떤 상태를 가지고, 어떻게 이동하는가?”
>
> 이 흐름을 `mint`, `transfer`, `approve`, `transferFrom` 순서로 차근히 따라가며,
> **실제로 나만의 ERC-20 컨트랙트를 작성해볼 것입니다.**

---

그리고 마지막에는,
이런 질문도 던져볼 겁니다:

> “굳이 함수를 호출하지 않아도,
> 이더를 보내는 것만으로 토큰을 지급할 수 있을까?”

이 질문을 통해 우리는 `receive()`를 활용해
**토큰 지급 흐름을 확장하는 방법까지 실습해볼 예정입니다.**

## 오늘 수업 목차

| 순서 | 주제                                                       |
| ---- | ---------------------------------------------------------- |
| 1    | ERC / EIP 개념 간단 정리                                   |
| 2    | Truffle 기본 구조 및 배포 흐름 복습                        |
| 3    | ERC-20 핵심 상태 설계 (`balances`, `allowances`, `supply`) |
| 4    | `mint`, `transfer`, `approve`, `transferFrom` 함수 구현    |
| 5    | 상태 변화에 대한 require 조건과 이벤트 발생 처리           |
| 6    | receive() 함수로 확장된 토큰 지급 흐름 설계                |
| 7    | 전체 흐름 테스트 기반 구현 확인 (TDD)                      |

## 오늘 수업 핵심

> **“ERC-20은 ‘기술적으로 대단한 토큰’을 배우는 수업이 아니다.”**

우리가 오늘 배우는 건
**토큰이라는 가치를 ‘이더리움 위에서 코드로 어떻게 정의했는가’**입니다.

- **EIP는 제안서이고, ERC는 그 제안서의 실현입니다.**
- 우리는 ERC-20을 통해
  단순히 토큰을 배우는 것이 아니라
  **“EIP → ERC → 코드 구현”의 흐름을 처음으로 인지하는 시간**입니다.

---

그리고 **덧붙이자면, ERC-20은 이더리움 생태계에서 실제로 가장 자주 사용되고, 구현되는 대표적인 표준 중 하나입니다.**

> 즉, **우리가 배운 흐름이 이후 다양한 컨트랙트들을 구현할 때에도 기본 토대가 됩니다.**

그래서 오늘은 단순한 기능 구현이 아니라,
**ERC-20의 전반적인 흐름과 설계 방식 자체를 온전히 체득하는 데 초점을 맞출 것입니다.**

---

기술은 수단이고,
**우리가 진짜로 가져가야 할 건 기본기와 설계 흐름에 대한 감각입니다.**
그걸 쌓기 위해 오늘은 ERC-20부터 직접 구현하며 출발하는 거예요.
