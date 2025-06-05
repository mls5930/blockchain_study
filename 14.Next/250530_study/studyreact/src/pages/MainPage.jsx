import { useState } from "react"
import { Button } from "../components/button"
import { useCounter } from "../hooks/counthooks";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useInput } from "../hooks/useInput";

export const MainPage = () => {
    const { count, increment, decrement } = useCounter();
    const count2 = useSelector((state) => state.counter.count);
    const dispatch = useDispatch()
    console.log(count2);
    const { value, onChange, reset } = useInput();
    return (
        <div>
            <div>더하기 page</div>
            {count}
            <Button onClick={increment}>더하기</Button>
            {count2}
            <Button>
                <button onClick={() => dispatch({ type: "MULTIPLY" })}>곱하기</button>
                <button onClick={() => dispatch({ type: "DIVLDE" })}>나누기</button>
            </Button>
            <input value={value} onChange={onChange} />
            <div>{value}</div>
            <button onClick={reset}>초기화</button>
            <NavLink to="/body">페이지가기</NavLink>
        </div>
    );


}