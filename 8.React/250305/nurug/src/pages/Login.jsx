import React, { useContext, useState } from "react";
import { AppContext } from "../store/study";

export const Login = () => {
    const [state, dispatch] = useContext(AppContext);
    // const [login, setLogin] = useState(false)

    /*
        login = true =>  <button>로그아웃!</button>
        login = false => <button>로그인!</button>
    */
    return (
        <>
            {state.isLogin ? 
                <button onClick={() => dispatch({type: "LOGOUT"})}>로그아웃!</button> 
                : 
                <button onClick={() => dispatch({type: "LOGIN"})}>로그인!</button>
            }
        </>
    )
}