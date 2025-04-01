import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT, INCREMENT } from "../../reducers/counter2Reducer";

export const Counter2 = () => {
    const { count } = useSelector((state) => state.count2);
    const dispatch = useDispatch()
    return (
        <>
            {count}
            <button onClick={() => dispatch({type: INCREMENT})}>+</button>
            <button onClick={() => dispatch({type: DECREMENT})}>-</button>
        </>
    )
}
