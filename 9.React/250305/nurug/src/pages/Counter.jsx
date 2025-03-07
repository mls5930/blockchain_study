import { useContext , memo } from "react"
import { CounterContext } from "../store/study"


export const Counter = () => {
    // const [count , setCount] = useState(0);
    // 전역상태에서 가져올거임
    const {state, dispatch} = useContext(CounterContext)
    console.log("재생성 됨? Counter");
    return(
        <>
            {state.count}
            <button onClick={() => dispatch({type:"INCREMENT"})}>+</button>
            <button onClick={() => dispatch({type:"DECREMENT"})}>-</button>
        </>
    )
}