import React, { useEffect, useState } from "react"
import { countReducer } from "../reducer/counterReducer"
import { getCount, postCount } from "../api"

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const Counter = () => {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([]);

    const getHistory = (result) => {
        const history = result.map((value) => {
            return { id: value.id, createdAt: value.createdAt }
        });
        return history
    }
    
    useEffect(() => {
        const fetchData = async() => {
            const result = await getCount();
            const history = getHistory(result);
            setCount(result[0].value)
            setHistory(history)
        }
        fetchData()
    }, [])

    const handleDispatch = async(action) => {
        try {
            const newValue = countReducer(count, action);
            const value = await postCount(newValue);
            const result = await getCount();
            const history = getHistory(result);
            setCount(value)
            setHistory(history)
        } catch (error) {
            console.log("Counter 기능 실패...", error);
        }
    }
    
    if(history.length <= 0) return <>값이 없음!</>
    
    return (
        <>
            {count}
            <button onClick={() => handleDispatch({type: INCREMENT})}>+</button>
            <button onClick={() => handleDispatch({type: DECREMENT})}>-</button>
            <ul>
                {history.map((value) => (
                   <React.Fragment key={value.id}>
                        <li>{value.createdAt}</li>
                   </React.Fragment>
                ))}
            </ul>
        </>
    )
}