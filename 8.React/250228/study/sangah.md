## 회고

### 오늘 뭐가 어려웠어?

- 커스텀 훅
- css를 왜써야하는지

css는 안써도돼

- NavLink => 스타일드 컴포넌트로 어떻게 꾸미고 사용하는지?

해결

### 커스텀 훅의 이해

아래 흐름으로 간단히 설명하면, **커스텀 훅**을 왜 쓰는지, 그리고 **어떻게 쓰면 편한지**가 잘 드러납니다.

---

## 1. **문제 상황**

- **한 컴포넌트**에 **3개의 입력값**이 있다고 가정(예: 아이디, 비밀번호, 이메일).  
- 각각 `useState`로 상태를 선언하면, 3개의 `value`, 3개의 `setValue`, 그리고 3개의 **핸들러(onChange 함수)**가 필요.
- 거기에 **handleSubmit**도 작성해야 해서, 컴포넌트 내부 코드가 길어짐.

> 예시:
> ```jsx
> const [userid, setUserId] = useState('');
> const [password, setPassword] = useState('');
> const [email, setEmail] = useState('');
>
> // 각각 onChange 핸들러를 3개 선언...
> // handleSubmit 함수...
> ```

결과적으로, **중복된 로직**(상태 관리 + onChange)만 계속 반복되면서 **유지보수**가 어려워짐.

---

## 2. **커스텀 훅의 아이디어**

- **중복되는 상태 관리 로직**(예: `useState` + `onChange`)을 **하나의 함수**로 묶어두고, **필요할 때마다 쉽게 호출**.
- 예: `useInput` 훅을 만들어서, **입력값**과 **onChange** 함수를 **한꺼번에** 리턴.

```jsx
// 📁 hooks/useInput.js
import { useState } from 'react';

export const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};
```

---

## 3. **어떻게 편해지나?**

- `useInput` 훅을 여러 번 호출하면, 각 `input`마다 **별도의 state**와 **onChange**가 자동으로 생김.
- 컴포넌트 내 코드는 **한 줄**씩만 늘어남.

```jsx
function MyForm() {
  const userid = useInput('');
  const password = useInput('');
  const email = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userid.value, password.value, email.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...userid} placeholder="아이디" />
      <input type="password" {...password} placeholder="비밀번호" />
      <input type="email" {...email} placeholder="이메일" />
      <button type="submit">제출</button>
    </form>
  );
}
```

- `userid`, `password`, `email` 각각은 `{ value, onChange }` 구조.
- 기존에는 **3개의 useState + 3개의 onChange 함수**를 직접 작성해야 했지만,  
  **`useInput` 하나로** 상태와 이벤트 핸들러를 묶어 **재사용**할 수 있음.

---

## 4. **주의할 점**

- **커스텀 훅** 하나로 모든 상태(예: 12개)를 **모아서 관리**한다기보다는, **필요한 만큼** 여러 번 호출해서 쓰는 개념.
- 즉, `useInput`을 **한 번** 호출할 때마다 **1개의 입력값**을 관리.  
- 만약 20개의 폼 필드가 있다면 `useInput`을 **20번** 호출할 수도 있음(중복 로직이 훅 안에서 정리되므로 훨씬 깔끔).

---

## 5. **정리**

1. **`useState`가 여러 번** 필요한 경우, **상태와 이벤트 핸들러**를 **커스텀 훅**으로 추출 → **반복 로직 감소**  
2. **여러 input 필드**가 있을 때, 각각 `useInput` 훅을 호출하기만 하면, **`value` + `onChange`**가 자동 제공  
3. **큰 덩어리**로 12개 상태를 “한 훅에 전부 몰아넣는” 것보다, **입력 필드당 1개씩** 깔끔하게 나눠서 관리  

결과적으로, **코드가 단순화**되고, **유지보수**가 쉬워지며, **재사용성**이 높아집니다.  
이것이 **커스텀 훅**으로 편하게 관리하자는 **핵심 의도**입니다!

## 숙제

1. 먼저 **[text](../5.customHook.md)** 파일을 정독해 주세요.  
   - 커스텀 훅을 왜 사용하는지, 어떤 상황에서 유용한지 감을 잡을 수 있을 겁니다.  

2. **`Header.jsx`** 코드를 살펴보면서,  
   - “여긴 반복되는 로직이 있네?”라고 생각되는 부분을 찾아봅시다.  
   - 예: 여러 메뉴 항목을 일일이 나열하거나, **비슷한 상태/함수**를 반복해서 작성하고 있는지 확인하세요.

3. 만약 “반복되는 코드가 많다” 싶으면, 그 로직을 **하나의 커스텀 훅**으로 묶어볼 수 있겠죠.  
   - 예: 메뉴 배열을 훑어서 NavLink를 생성한다거나, 상태 관리 부분을 공통화한다거나…

4. **결과**:  
   - 중복 코드가 싹 정리되고, **재사용성**이 높아지는 경험을 해볼 수 있을 겁니다.  
   - 커스텀 훅을 잘 만들면, 컴포넌트 안에서 “UI”와 “비즈니스 로직”이 깔끔하게 분리된다는 걸 직접 느끼게 됩니다.

궁금한 점이 있으면 언제든지 질문하셔도 됩니다.  
**주말 과제**를 통해, 커스텀 훅을 활용한 **중복 코드 제거**와 **로직 분리**를 연습해 보세요. 화이팅입니다!