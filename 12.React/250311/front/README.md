# 오늘 할 것

카운터 구현

1. 단순 useState만으로 구현
2. 전역 환경(useContext)으로 구현
3. 리듀서 함수 및 dispatch 적용

## 단순 useState만으로 구현

### 디렉토리 구조

```sh
front
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.css
   ├─ App.jsx
   ├─ api
   │  ├─ axios.js
   │  ├─ counter.js
   │  └─ index.js
   ├─ index.css
   ├─ index.jsx
   ├─ pages
   │  ├─ Counter.jsx
   │  └─ index.jsx
   └─ reducer
      └─ counterReducer.js

```

### 초기 Counter.js

```jsx
import { useEffect, useState } from "react"
import { countReducer } from "../reducer/counterReducer"
import { getCount, postCount } from "../api"

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"

export const Counter = () => {
    const [count, setCount] = useState(0);
    // const [history, setHistory] = useState([]);
    
    useEffect(() => {
        ;(async() => {
            const count = await getCount();
            setCount(count)
        })()
    }, [])

    const handleDispatch = async(action) => {
        try {
            const newValue = countReducer(count, action);
            const value = await postCount(newValue);
            setCount(value);
        } catch (error) {
            console.log("Counter 기능 실패...", error);
        }
    }
    
    return (
        <>
            {count}
            <button onClick={() => handleDispatch({type: INCREMENT})}>+</button>
            <button onClick={() => handleDispatch({type: DECREMENT})}>-</button>
        </>
    )
}

```

#### back/server.js

```js
app.get('/counter', async (req, res) => {
  try {
    const result = await Counter.findAll({
      order: [['id', 'DESC']],
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
```

#### front/Counter.jsx

```jsx
 useEffect(() => {
        const fetchData = async() => {
            const result = await getCount();
            const history = getHistory(result);
            setCount(result[0].value)
            setHistory(history)
        }
        fetchData()
    }, [])
```

#### front/Counter.jsx

```jsx
   const getHistory = (result) => {
        const history = result.map((value) => {
            return { id: value.id, createdAt: value.createdAt }
        });
        return history
    }
```

#### front/Counter.jsx

```jsx
    <ul>
        {history.map((value) => (
            <React.Fragment key={value.id}>
                <li>{value.createdAt}</li>
            </React.Fragment>
        ))}
    </ul>
```

#### back/server.js

```jsx
app.post("/counter", async(req, res) => {
  try {
      const { newValue } = req.body      
      const newCounter = await Counter.create({value: newValue});
    //   res.json({value: newCounter.value});
      res.json(newCounter.value);
  } catch (error) {
      console.log(error);
  }
})
```

#### front/src/api/counter.js

원래의 값

=>

```js
export const postCount = async(newValue) => {
    const {data : { value }} = await instance.post(`/counter`, { newValue });
    return value
}
```

=> 아래의 값으로 수정

```js
export const postCount = async(newValue) => {
    const {data} = await instance.post(`/counter`, { newValue });
    return data
}
```

## 전역 환경(useContext) 구현

store 디렉토리 생성
store/index.jsx 생성

```jsx
import React, { createContext } from "react"

const AppContext = createContext(null);
```

```jsx
export const AppProvider = ({children}) => {

    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([]);

    return (
        <AppContext.Provider value={{
            count,
            setCount,
            history,
            setHistory
        }}>
            {children}
        </AppContext.Provider>
    )
}
```

```jsx
export const useCounter = () => useContext(AppContext);
```

### src/App.jsx

```jsx
import './App.css';
import { Counter } from "./pages"
import { AppProvider } from "./store"


function App() {
  return (
    <AppProvider>
      <Counter/>
    </AppProvider>
  );
}

export default App;
```

### src/pages/Counter.jsx

```jsx
export const Counter = () => {

    const {            
        count,
        setCount,
        history,
        setHistory 
    } = useCounter();
}
```

## 리듀서 구현

### 리듀서 위치 변경

`src/reducer/counterReducer.js` => `src/store/counterReducer.js`

### useReducer

`src/store/index.jsx`

```jsx

export const AppProvider = ({children}) => {

    const init = {
        count: 0,
        history: []
    }

    useReducer(countReducer, init)
}
```

### src/store/index.jsx

```jsx
export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

const AppContext = createContext(null);
```


```jsx
    const [state, dispatch] = useReducer(countReducer, { count: 0, history: [] });
    const [isInitialized, setIsInitialized] = useState(false);
```

```jsx

    const getHistory = (result) => {
        return result.map((value) => ({
            id: value.id,
            createdAt: value.createdAt
        }));
    };

    const getInit = async () => {
        const result = await getCount();
        const history = getHistory(result);
        return { count: result[0].value, history };
    };
```

```jsx
useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInit();
                dispatch({ type: SETDATA, payload: data });
                setIsInitialized(true);
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        };
        fetchData();
    }, []);

    const handleDispatch = async (action) => {
        try {
            const value = await postCount(action.payload);
            const result = await getCount();
            const history = getHistory(result);
            const payload = { count:value, history };
            dispatch({ type: action.type, payload });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };
```

전체코드

### src/store/index.jsx

```jsx
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { countReducer } from "./counterReducer";
import { getCount, postCount } from "../api";

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    const getHistory = (result) => {
        return result.map((value) => ({
            id: value.id,
            createdAt: value.createdAt
        }));
    };

    const getInit = async () => {
        const result = await getCount();
        const history = getHistory(result);
        return { count: result[0].value, history };
    };

    const [state, dispatch] = useReducer(countReducer, { count: 0, history: [] });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInit();
                dispatch({ type: SETDATA, payload: data });
                setIsInitialized(true);
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        };
        fetchData();
    }, []);

    const handleDispatch = async (action) => {
        try {
            const value = await postCount(action.payload);
            const result = await getCount();
            const history = getHistory(result);
            const payload = { count:value, history };
            dispatch({ type: action.type, payload });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>; // 초기 로딩 화면 표시
    }

    return (
        <AppContext.Provider value={{ state, handleDispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useCounter = () => useContext(AppContext);
```

### src/pages/Counter.jsx

```jsx
import React from "react"
import { DECREMENT, INCREMENT, useCounter } from "../store"

export const Counter = () => {

    const { state, handleDispatch } = useCounter();
    if(state.history.length <= 0) return <>값이 없음!</>

    return (
        <>
            {state.count}
            <button onClick={() => handleDispatch({type: INCREMENT, payload: state.count + 1})}>+</button>
            <button onClick={() => handleDispatch({type: DECREMENT, payload: state.count - 1})}>-</button>
            <ul>
                {state.history.map((value) => (
                   <React.Fragment key={value.id}>
                        <li>{value.createdAt}</li>
                   </React.Fragment>
                ))}
            </ul>
        </>
    )
}
```

## 전체 디렉토리 구조

```sh
front
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
└─ src
   ├─ App.css
   ├─ App.jsx
   ├─ index.css
   ├─ index.jsx
   ├─ api
   │  ├─ axios.js
   │  ├─ counter.js
   │  └─ index.js
   ├─ pages
   │  ├─ Counter.jsx
   │  └─ index.jsx
   └─ store
      ├─ counterReducer.js
      └─ index.jsx
```