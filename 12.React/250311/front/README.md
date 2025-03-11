## 디렉토리 구조

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

## 초기 Counter.js

```jsx
import { useEffect, useState } from "react"
import { countReducer } from "../reducer/counterReducer"
import { getCount, postCount } from "../api"

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

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

### back/server.js

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

### front/Counter.jsx

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

### front/Counter.jsx

```jsx
   const getHistory = (result) => {
        const history = result.map((value) => {
            return { id: value.id, createdAt: value.createdAt }
        });
        return history
    }
```

### front/Counter.jsx

```jsx
    <ul>
        {history.map((value) => (
            <React.Fragment key={value.id}>
                <li>{value.createdAt}</li>
            </React.Fragment>
        ))}
    </ul>
```

### back/server.js

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

### front/src/api/counter.js

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

## 전역 환경(전역 상태) 구현