import React, { useContext } from "react";
import { AppContext } from "../store/study";

export const Counter = () => {
    // const [count, setCount] = useState(0);
    // 전역 상태에서 가져올거임
    /* 
        state = {
            count: 0,
            isLogin: false
        }
    */
    const [state, dispatch] = useContext(AppContext)
    console.log(state);
    
    return (
        <>
            {state.count}
            <button onClick={() => dispatch({type: "INCREMENT"})}>+</button>
        </>    
    )
}