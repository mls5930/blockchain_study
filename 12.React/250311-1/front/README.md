# 리덕스

1. redux react-redux순으로 카운터 구현
2. 데이터 패치를 어디서 할 것인가?(불편함 느낌)
3. 데이터 패치에 미들웨어 즉, 중간단계가 필요하다.
4. 리덕스 썽크로 구현하기

이런씩으로 수업을 진행하려고 하니까 redux react-redux순으로 카운터 구현

## 리덕스 설정

```sh
npm install redux react-redux
```

### 디렉토리 구조

```sh
src
  ├── store/
  │   ├── counterReducer.js
  │   ├── rootReducer.js
  │   ├── index.js
  ├── App.js
  ├── index.js

```
### src/store/counterReducer.js

```js
const SETDATA = "SETDATA";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const initialState = { count: 0, history: [] };

export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETDATA: 
            return { ...state, ...action.payload };
        case INCREMENT:
            return { ...state, ...action.payload };
        case DECREMENT:
            return { ...state, ...action.payload };
        case RESET:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

// 액션 생성자
export const setdata = () => ({ type: SETDATA });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
```

### src/store/rootReducers

```js
import { combineReducers } from "redux"
import { countReducer } from "./counterReducer";

const rootReducers = combineReducers({
    count: countReducer
})

export default rootReducers
```

### 스토어 설정

```jsx
import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

export default store;
```

