
`front/src/pages/counter/Counter.jsx`

```jsx
    const handleDispatch = async (type, newValue) => {
        try {
            await postCount(newValue);
            const data = await getData();
            dispatch({ type, payload: {...data} });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };
```

`/front/src/reducers/rootReducer.jsg`

```jsx
import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";

const rootReducer = combineReducers({
    count: counterReducer
})

export default rootReducer
```

`src/store.js`

```jsx
import { createStore } from "redux"
import rootReducer from "./reducers/rootReducer"

export const store = createStore(rootReducer);
```

`src/pages/counter/Counter.jsx`

```jsx
    const { history } = useSelector((state) => state);
```

=> 아래 코드로 변경


```jsx
    const { history } = useSelector((state) => state.count);
```


## 디렉토리 구조 변경

```sh
front
├─ README.md
├─ package-lock.json
├─ package.json
├─ public 
└─ src
   ├─ App.css
   ├─ App.jsx
#    ├─ store 디렉토리 삭제
   ├─ api
   │  ├─ axios.js
   │  ├─ counter.js
   │  └─ index.js
   ├─ index.css
   ├─ index.jsx
   ├─ pages
   │  ├─ counter
   │  │  ├─ Counter.jsx 
   │  │  └─ getData.js
   │  └─ index.jsx
   ├─ reducers # 리듀서 함수들 모음
   │  ├─ counterReducer.js # 카운터 함수 리듀서
   │  └─ rootReducer.js # 최상단 루트 리듀서 함수
   └─ store.js # 스토어 파일로 변경
```

Redux의 기본 동작 방식의 한계를 이해하고 Thunk로 해결

1. 데이터 패치를 어디서 할 것인가?(불편함 느낌)
2. 데이터 패치에 미들웨어 즉, 중간단계가 필요하다.
3. 리덕스 썽크로 구현하기

### Redux Thunk 적용 (비동기 상태 관리 도입)

```sh
npm install redux-thunk
```

```js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));

```

`front/src/actions/counterAction.js`

```jsx
import { postCount } from "../api/counter";
import { getData } from "../pages/counter/getData";
import { SETDATA } from "../reducers/counterReducer";

export const fetchData = () => {
    return async (dispatch) => {
        const data = await getData();
        dispatch({ type: SETDATA, payload: data });
    };
};

// 원래 이름 handleDispatch
export const updateCount = (type, newValue) => {
    return async (dispatch) => {
        await postCount(newValue);
        const data = await getData();
        dispatch({ type, payload: { ...data } });
    };
};
```

- 비동기 함수이다! 라는걸 알려줘야 됌
- 이름 변경하겠음

아래는 **현업에서 자주 쓰이는 패턴**을 기준으로, “이 함수가 비동기 요청을 하는 Redux Thunk 액션”이라는 것을 **이름만 보고도** 파악할 수 있게끔 정리한 예시입니다.  

## **1. “fetch” + 도메인 명**  

- **데이터를 서버에서 가져오는 경우**에 사용  
- 예) `fetchSetData`, `fetchUserList`  

```js
export const fetchSetData = () => {
    return async (dispatch) => {
        const data = await getData();
        dispatch({ type: SETDATA, payload: data });
    };
};
```

## **2. “update” + 도메인 명**  

- **서버에 데이터를 업데이트(POST/PUT/PATCH)** 하는 경우에 사용  
- 예) `updateCount`, `updateUserProfile`  

```js
export const updateCount = (type, newValue) => {
    return async (dispatch) => {
        await postCount(newValue);
        const data = await getData();
        dispatch({ type, payload: { ...data } });
    };
};
```

## **3. “create” / “delete” / “load” / “set”** 등 (추가 상황별)  
- **CRUD** 작업에 따라 직관적으로 구분  
    - `createCountData()`, `deleteCountData()`, `loadInitialCount()` 등  

---

1. **`fetchXxx`**: 서버에서 가져오는 비동기 요청  
2. **`updateXxx`**: 서버에 데이터를 갱신하는 비동기 요청  
3. **`createXxx`**, **`deleteXxx`**: CRUD 작업 시 직관적 표현  

`front/src/pages/counter/Counter.jsx`

```jsx
export const Counter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch])
    
    return (
        <>
            <Left/>
            <Right/>
        </>
    )
}
```

```jsx
const Left = () => {
    const { count } = useSelector((state) => state.count);
    const dispatch = useDispatch()
    return (
        <>
            {count}
            <button onClick={() => dispatch(updateCount(INCREMENT, count + 1))}>+</button>
            <button onClick={() => dispatch(updateCount(DECREMENT, count - 1))}>-</button>
        </>
    )
}
```
