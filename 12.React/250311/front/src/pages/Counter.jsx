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

    // const [state, setstate] = useState({count: 0, history: []})
    {/* <Component count={state.count} history={state.history}></Component> */}
    {/* <Component state={state}></Component> */}
    //<Component count={count} history={history}></Component>


    /*
        1. 상태는 최대한 객체형식보다는 각각 따로 책임을 지는것이 좋음
        2. 상태 패치 함수는 [, setCount] 반드시 규칙을 지켜야 합니당.
        3. 자주 사용할 것 같은 함수는 따로 빼놓습니다.
    */