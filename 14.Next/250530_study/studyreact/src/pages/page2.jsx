
import { useState } from "react"
import { Button } from "../components/button"
import { useCounter } from "../hooks/counthooks"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
export const Page2 = () => {
    const { count, decrement } = useCounter()
    const count2 = useSelector((state) => state.counter.count)

    const dispatch = useDispatch()

    return (
        <div>
            <div> page2</div>
            {count}
            <Button>
                <button onClick={decrement}>빼기</button>
            </Button>
            {count2}
            <Button>
                <button onClick={() => dispatch({ type: "MULTIPLY" })}>곱하기</button>
                <button onClick={() => dispatch({ type: "DIVLDE" })}>나누기</button>
            </Button>
            <NavLink to="/page2">페이지2이동하기</NavLink>
        </div>
    )


}