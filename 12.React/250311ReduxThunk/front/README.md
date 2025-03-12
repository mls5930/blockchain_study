# **Redux Thunk 적용 방식**

1. **Redux Middleware 적용** → `redux-thunk` 설치 및 Redux Store 설정 변경  
2. **비동기 Action 생성** → `fetchData` 등의 API 요청을 Action에서 실행  
3. **컴포넌트에서 dispatch 호출** → `dispatch(fetchData())` 형태로 사용  

---

## **1. Redux Thunk 설치**

```sh
npm install redux-thunk
```

---

## **2. Redux Store 설정 (Thunk 미들웨어 추가)**  

`src/store/index.js`  

```js
import { createStore, applyMiddleware } from "redux";
import { counterReducer } from "./counterReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(counterReducer, applyMiddleware(thunk));

export { store, Provider };
```

**변경된 사항**  
- `applyMiddleware(thunk)`를 추가하여 **Redux에서 dispatch에 함수를 전달할 수 있도록 설정**  

---

## **3. Redux Action에서 API 요청 수행 (Thunk 적용)**

`src/store/counterActions.js`  

```js
import { getCount, postCount, getHistory } from "../api/counter";

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

// 초기 데이터 가져오기 (비동기)
export const fetchInitialData = () => {
    return async (dispatch) => {
        try {
            const result = await getCount();
            const history = getHistory(result);
            dispatch({ type: SETDATA, payload: { count: result[0].value, history } });
        } catch (error) {
            console.error("초기 데이터 로딩 실패", error);
        }
    };
};

// 카운트 업데이트 후 상태 갱신 (비동기)
export const updateCount = (type, newValue) => {
    return async (dispatch) => {
        try {
            await postCount(newValue);
            const result = await getCount();
            const history = getHistory(result);
            dispatch({ type, payload: { count: result[0].value, history } });
        } catch (error) {
            console.error("카운트 업데이트 실패", error);
        }
    };
};
```

**변경된 사항** 

- `fetchInitialData()` → **Redux가 API 호출을 수행하여 초기 상태를 가져옴**  
- `updateCount(type, newValue)` → **버튼 클릭 시 Redux가 API 호출 후 상태 갱신**  

## **4. Redux Reducer (기본 구조 유지)**
`src/store/counterReducer.js`
```js
const initialState = {
    count: 0,
    history: []
};

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETDATA:
            return { ...state, ...action.payload };
        case INCREMENT:
        case DECREMENT:
            return { ...state, count: action.payload.count, history: action.payload.history };
        case RESET:
            return { ...state, count: 0, history: [] };
        default:
            return state;
    }
};
```

**변경된 사항 없음**  
- Thunk는 Action에서 비동기 API 요청을 처리하므로 Reducer는 순수 함수로 유지됨  

## **5. Redux Store에서 초기 데이터 로드**
`src/App.jsx`
```js
import "./App.css";
import { Counter } from "./pages";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInitialData } from "./store/counterActions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitialData());  // Redux가 API 호출하여 초기 데이터 로드
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
}

export default App;
```

**변경된 사항**  

- `useEffect`에서 **Redux가 API 호출하여 초기 상태를 가져오도록 변경**  
- 컴포넌트 내부에서 직접 API 호출을 하지 않고 **Redux Thunk를 통해 상태를 관리**  

---

## 6. Counter 컴포넌트에서 dispatch 사용

`src/pages/Counter.jsx`  

```js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCount, INCREMENT, DECREMENT } from "../store/counterActions";

export const Counter = () => {
    const dispatch = useDispatch();
    const { count, history } = useSelector((state) => state);

    if (history.length <= 0) return <>값이 없음!</>;

    return (
        <>
            <h2>카운트: {count}</h2>
            <button onClick={() => dispatch(updateCount(INCREMENT, count + 1))}>+</button>
            <button onClick={() => dispatch(updateCount(DECREMENT, count - 1))}>-</button>
            <ul>
                {history.map((value) => (
                    <React.Fragment key={value.id}>
                        <li>{value.createdAt}</li>
                    </React.Fragment>
                ))}
            </ul>
        </>
    );
};
```
**변경된 사항**  

- **`dispatch(updateCount(INCREMENT, count + 1))`** 방식으로 **Redux에서 API 요청 후 상태 갱신**  
- `handleDispatch`를 없애고 Redux Action을 직접 호출  
