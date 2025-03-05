import React, { useContext } from "react";
import { AppContext } from "../store/study";

export const Counter = () => {
    // const [count, setCount] = useState(0);
    // 전역 상태에서 가져올거임
    const [state, dispatch] = useContext(AppContext)
    return (
        <>
            {state.count}
            <button onClick={() => dispatch({type: "INCREMENT"})}>+</button>
        </>    
    )
}