
import { useCounter } from "../hooks/counthooks"
export const Counter = () => {
    const { count, increment, decrement } = useCounter(0);
    return (
        <div>
            <div>count page</div>
            <div>{count}</div>
            <button onClick={increment}>더하기 버튼</button>
            <button onClick={decrement}>빼기 버튼</button>
        </div>
    )
}
