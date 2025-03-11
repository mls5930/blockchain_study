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