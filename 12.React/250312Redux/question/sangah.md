## 오늘 뭐가 헷갈렸누?

- useSelector
- useDispatch

### 학생의견 : 그럼 순서가

1. dispatch
2. store에 등록된 리듀서 함수 호출
3. 2번의 리듀서 함수가 반환한 값을 dispatch가 받음
4. dispatch는 내부적으로 setState를 호출함.

### 📌 **Redux의 `dispatch` 내부 동작 순서가 맞는지 판단**  

결론부터 말하면, **대체로 맞지만 "dispatch가 setState를 호출한다"는 부분이 정확하지 않음**.  

---

## ✅ **Redux의 정확한 내부 동작 순서**
> `dispatch(action)`을 호출하면 Redux 내부에서는 아래 순서로 동작합니다.

### **🛠 1️⃣ `dispatch(action)` 실행**
- 컴포넌트에서 `dispatch({ type: "INCREMENT" })` 호출  
- Redux의 `dispatch` 함수가 실행됨  

```js
store.dispatch({ type: "INCREMENT" });
```

---

### **🛠 2️⃣ `store`에 등록된 리듀서 실행**
- `store.dispatch(action)`은 내부적으로 `reducer(state, action)`을 호출  
- 현재 `state`와 `action`을 전달하여 새로운 상태를 반환  

```js
const newState = reducer(currentState, { type: "INCREMENT" });
```

---

### **🛠 3️⃣ 새로운 상태를 `store` 내부에 저장**
- `reducer`가 반환한 **새로운 상태(newState)를 store가 업데이트**  

```js
store.state = newState;  // 새로운 상태로 교체
```

---

### **🛠 4️⃣ `subscribe`된 모든 리스너(예: React 컴포넌트)를 실행**
- `store`에 구독(`subscribe`)된 함수들을 실행하여, **상태가 변경되었음을 알림**  
- React와 연결되어 있다면 `react-redux`의 `useSelector`가 이 변화를 감지하고 **컴포넌트를 리렌더링**  

```js
listeners.forEach(listener => listener());
```

---

### **🚨 잘못된 부분: `dispatch`가 `setState`를 호출하는가?**
❌ **Redux는 자체적으로 `setState`를 호출하지 않음.**  
✅ Redux는 **React와 완전히 별개**인 상태 관리 라이브러리이며, React의 `setState`와 관련이 없음.  

🚀 **그러나, `react-redux`를 사용하면 `useSelector`가 store의 변화를 감지하고 `setState`를 호출하여 컴포넌트를 리렌더링**함.  

```js
useEffect(() => {
    function checkForUpdates() {
        const newState = selector(store.getState());
        if (newState !== selectedState) {
            setSelectedState(newState);  // 🔥 여기서 React의 setState가 실행됨
        }
    }
    const unsubscribe = store.subscribe(checkForUpdates);
    return () => unsubscribe();
}, [store]);
```

---

## ✅ **Redux의 정확한 내부 동작 순서 (수정 버전)**
| 순서 | 설명 |
|------|---------------------------|
| 1️⃣ | **dispatch(action)** 호출 |
| 2️⃣ | **store에 등록된 reducer 실행** (`reducer(currentState, action)`) |
| 3️⃣ | **reducer가 반환한 새로운 상태를 store가 저장** |
| 4️⃣ | **구독된 모든 listener 실행 (예: useSelector 리렌더링 트리거)** |
| 5️⃣ | (React-Redux의 경우) `useSelector`가 **변경 감지 후 setState 호출하여 컴포넌트 리렌더링** |