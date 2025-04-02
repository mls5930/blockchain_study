# 제네릭을 이해하기 위해서는

- 왜 타입을 미리 예측하기 어려운가?

위의 질문에 많은 고민을 해야함

**“그럼 타입을 나중에 외부에서 지정해주면 더 유연하고 안전하지 않을까?”**

그리고 다음 고민

**왜 이러한 제네릭과 제네릭 동적 타입같은게 존재할까?**

이것에 대한 고민이 필요하다.
결국 마지막에는

**타입을 추상화하고 안전하게 재사용하는 도구**로 받아들일 수 있도록 실습을 거쳐야 한다.

이 질문을 이해하기 위한 실습이 필요해 보인당

## **1단계: 아주 단순한 제네릭 함수 작성 실습**

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity<string>("hello");
const b = identity<number>(123);
```

- `T`는 어떤 타입이든 들어올 수 있다는 걸 보여줌
- `any`와의 차이: 타입 정보가 유지됨 → `.toUpperCase()` 같은 자동완성 됨
- 실습: `identity` 함수에서 잘못된 타입 추론 유도 → 타입 안정성 확인

## **2단계: 제네릭을 사용하지 않았을 때의 반복과 불편함 체험**

```ts
function logString(value: string): string {
  console.log(value);
  return value;
}

function logNumber(value: number): number {
  console.log(value);
  return value;
}
```

- "이거 너무 똑같잖아?" → 중복 인식
- 그래서 등장: `function log<T>(value: T): T`

## 실습

logString, logNumber 함수를 제네릭 동적 타입을 활용하여 하나의 함수로 만들어보시오
