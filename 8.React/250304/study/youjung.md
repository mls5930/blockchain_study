## 오늘 뭐가 어려웠어?

### 캐싱

캐싱 => 기억해둔다.

메모이제이션
캐싱

공부해두면 좋아요.

최적화

React.memo()
useMemo()
useCallback

전역 상태 관리

useContext

궁극적인 목표

리액트 모토를 기준으로 쓸데없는 리렌더링도 방지하자 이거야.  
근데 리렌더링 비용값은 그렇게 비싸지 않음.  
=> 지금은 머리가 깨지겠지만, 반드시 알아야하는 `개념`입니다.

## 다른 글 보니까 캐싱이 신선한걸로 교체한다라고 표현함.

알아야 할 것이 있음.  
글을 잘 못 본거야(설명하는 기준이 다른 글)

## 리액트의 캐싱 개념과 리액트-쿼리(라이브러리)의 캐싱 개념은 비슷하지만 다름!

### 리액트자체에서의 캐싱

React 자체는 브라우저에서 렌더링 성능을 최적화하기 위해 컴포넌트 기반의 메모이제이션 및 리렌더링 최적화 기법을 사용
=> `브라우저의 렌더링` 기준으로 최적화

### 리액트 쿼리에서의 캐싱 개념

서버에서 데이터를 가져올 때 캐싱을 활용하여 불필요한 네트워크 요청을 방지
=> 네트워크 비용 기준

따라서, 만약 API 데이터를 캐싱하고 관리하는 것이 목적이라면 React Query를 사용하는 것이 적절하고, **렌더링 성능을 최적화하고 싶다면 React.memo, useMemo, useCallback 같은 기법을 활용하는 것이 적절합니다**.

## 콜백과 콜백 사용법

그러니까, 언제 사용해야하는지 모르겠음.
그러면 질문할게 몇 가지 있음

## memo

사용하는 주체: 컴포넌트

```jsx
import { memo, useMemo, useCallback, useState } from "react"

const Child = () => {
    console.log("나는 Child! 호출될까?");
    
    return (
        <button>진짜?</button>
    )
}

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count}/>
        </>
    )
}
```

1. 버튼을 누른다
2. 상태가 변경됨을 리액트가 안다
3. Counter컴포넌트가 다시 생성(재평가 재실행)된다.
4. Child 컴포넌트도 다시 생성(재평가 재실행)된다.

```jsx
import { memo, useMemo, useCallback, useState } from "react"

const Child = (props) => {
    console.log("나는 Child! 호출될까?");
    
    return (
        <button>진짜?</button>
    )
};

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child/>
        </>
    )
}
```

1. 버튼을 누른다
2. 상태가 변경됨을 리액트가 안다
3. Counter컴포넌트가 다시 생성(재평가 재실행)된다.
4. Child 컴포넌트에 전달된 props를 비교한다
5. 이전 props, 이후 props 비교
6. 똑같다면, Child 컴포넌트 생성 안함(리렌더링 안함)

만약, props로 던진다면?

```jsx
import { memo, useMemo, useCallback, useState } from "react"

const Child = (props) => {
    console.log("나는 Child! 호출될까?");
    
    return (
        <button>진짜?</button>
    )
};

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count}/>
        </>
    )
}
```

1. 버튼을 누른다
2. 상태가 변경됨을 리액트가 안다
3. Counter컴포넌트가 다시 실행(재평가 재실행)된다.
4. Child 컴포넌트에 전달된 props를 비교한다
5. 이전 props, 이후 props 비교
6. 누를때마다 count 상태값이 변하니, Child 컴포넌트를 다시 생성(재평가, 재실행)

## useMemo

비교하는 기준: 함수의 반환`값`

```jsx
import { memo, useMemo, useCallback, useState } from "react"

const Child = memo((props) => {
    console.log("나는 Child! 호출될까?");
    console.log(props.parentCount);
    
    return (
        <>
            {props.parentCount}
            <button>진짜?</button>
        </>
        
    )
})

export const Counter = () => {
    const [count, setCount] = useState(0);

    const computed = () => {
        console.log("나는 비싼 연산");
        let number = 0;
        for(let i = 1; i <= 1000000000; i++) {
            number = number + i;
        }
        console.log(number);
        return number;
    }
    
    computed();

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count} />
        </>
    )
}
```

1. 버튼을 누른다
2. 상태가 변경됨을 리액트가 안다
3. Counter컴포넌트가 다시 생성(재평가 재실행)된다.
4. computed함수가 재평가, 재실행(다시 연산)

결국, 누를때마다 다시 계산하고 호출한다
=> 너무....불필요함
=> 반환값이 변경되면 다시 계산을 해야겠지
=> 근데, 반환값이 변경이 안되었죠?

```jsx
import { memo, useMemo, useCallback, useState } from "react"

const Child = memo((props) => {
    console.log("나는 Child! 호출될까?");
    console.log(props.parentCount);
    
    return (
        <>
            {props.parentCount}
            <button>진짜?</button>
        </>
        
    )
})

export const Counter = () => {
    const [count, setCount] = useState(0);

    const computed = useMemo(() => {
        console.log("나는 비싼 연산");
        let number = 0;
        for(let i = 1; i <= 1000000000; i++) {
            number = number + i;
        }
        return number;
    }, [])
    
    computed();

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count} />
        </>
    )
}
```

1. 버튼을 누른다
2. 상태가 변경됨을 리액트가 안다
3. Counter컴포넌트가 다시 생성(재평가 재실행)된다.
4. computed함수가 다시 생성(재평가, 재실행)
4. computed함수가 다시 연산을 때리기전에, 반환`값` 비교
5. 이전 반환값과 지금 반환값이 동일하면, 연산을 때리지 않음

결국, 누를때마다 다시 계산하고 호출한다
=> 너무....불필요함
=> 반환값이 변경되면 다시 계산을 해야겠지
=> 근데, 반환값이 변경이 안되었죠?

## 질문!

즉, 반환값을 이전 반환값, 이후 반환값 비교해서 기존에 연산해놓은 반환값을 재사용함. 근데 결국 이것도 계산 때린거아님? 그럼 계산을 때렸으면, 이게.....이해가 안되네? 다시 연산한거잖아? 비교를 한다는건 결국 현재값을 연산한거잖아? 그럼 useMemo는 속도가 왜 이렇게 빠르며, 결국 비교하기 이전에 연산때린거 아님?

## useMemo는 연산 결과가 어쨋든, 이전에 함수 반환값을 무조건 재사용함. 단, 의존성 배열을 감시하는데, 의존성 배열의 상태가 변경되면. 무조건 함수를 다시 생성한다.

```jsx
useMemo(,[count])
```

(1) 잘못된 생각

```jsx
useMemo(() => computeExpensiveValue(), [count]);
```
🚫 잘못된 생각:

computeExpensiveValue() 연산을 먼저 수행하고  
이전 sum 값과 새로운 sum 값을 비교하는 것 아님?

👉 아니다! useMemo는 sum 값을 비교하는 게 아니라, count가 변경되었는지만 체크한다.
즉, useMemo는 연산 결과(sum)을 저장해서 비교하는 게 아니라,  
의존성 값(count)이 변경되었는지만 보고, 변경되지 않았으면 기존 값을 그대로 재사용한다.

## useCallback

함수 자체를 캐싱
최초로 렌더링 되었을 때, 함수값이 아니라 자체를 캐싱
=> 주소값을

### **`memo` vs `useMemo` vs `useCallback` 핵심 비교**

- **"컴포넌트를 최적화할 것인가? 값(연산 결과)을 캐싱할 것인가? 함수 자체를 캐싱할 것인가?"**
- **최적화 대상이 다르다!**

| Hook              | 최적화 대상       | 반환 값                     | 사용 목적                                        | 주요 사례                                    |
| ----------------- | ----------------- | --------------------------- | ------------------------------------------------ | -------------------------------------------- |
| **`memo`**        | **컴포넌트**      | 기존 렌더링된 컴포넌트 결과 | **불필요한 자식 컴포넌트 렌더링 방지**           | `React.memo(Component)`                      |
| **`useMemo`**     | **값(연산 결과)** | 캐싱된 연산 결과            | **비싼 연산을 캐싱하여 불필요한 재계산 방지**    | `const result = useMemo(() => ..., [deps]);` |
| **`useCallback`** | **함수**          | 동일한 함수 참조 유지       | **불필요한 함수 재생성을 방지하여 props 최적화** | `const fn = useCallback(() => ..., [deps]);` |