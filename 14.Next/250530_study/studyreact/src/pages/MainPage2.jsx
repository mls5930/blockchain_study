
import { useState } from "react"
import { Button } from "../components/button"
import { useCounter } from "../hooks/counthooks"
import { useDispatch, useSelector } from "react-redux"
export const MainPage2 = () => {
    const { count, decrement } = useCounter()
    const count2 = useSelector((state) => state.counter.count)

    const dispatch = useDispatch()

    return (
        <div>
            <div>뺴기 page</div>
            {count}
            <Button>
                <button onClick={decrement}>빼기</button>
            </Button>
            {count2}
            <Button>
                <button onClick={() => dispatch({ type: "MULTIPLY" })}>곱하기</button>
                <button onClick={() => dispatch({ type: "DIVLDE" })}>나누기</button>
            </Button>

        </div>
    )


}