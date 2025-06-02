import { useState } from "react"
import { Button } from "../components/button"
import { useCounter } from "../hooks/counthooks";
import { useSelector, useDispatch } from "react-redux";
export const MainPage = () => {
    const { count, increment, decrement } = useCounter();
    const count2 = useSelector((state) => state.counter.count);
    const dispatch = useDispatch()
    console.log(count2);

    return (
        <div>
            <div>더하기 page</div>
            {count}
            <Button>
                <button onClick={increment}>더하기</button>
            </Button>
            {count2}
            <Button>
                <button onClick={() => dispatch({ type: "MULTIPLY" })}>곱하기</button>
                <button onClick={() => dispatch({ type: "DIVLDE" })}>나누기</button>
            </Button>
        </div>
    );


}
