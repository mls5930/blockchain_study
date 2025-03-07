import React ,{useContext}from "react"
import {CounterContext} from "../store/study"

export const Login = () => {
    const {state,dispatch} = useContext(CounterContext)
    const userid ="rhgPtjd"
     
    return (
        <>
            {state.islogin? <button onClick={() => dispatch({type:"LOGOUT"})}>{userid} 님 로그아웃!</button>:  <button onClick={() =>dispatch({type:"LOGIN",userid:userid})}>로그인!</button>}
        </>
    )
}