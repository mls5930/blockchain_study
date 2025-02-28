import React from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput"
/*
    props = {
        userid
        setUserId
        password
        setPassword
        children
    }
*/
export const Login = (props) => {
    const userid = useInput("");
    const password = useInput("");
    const navigate = useNavigate();

    const handleUserId = (e) => {
        userid.onChange(e)
    }

    const handlePassword = (e) => {
        password.onChange(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userid.value === "wnqudgus1234"&& password.value === "qwer1234") {
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={userid.value} onChange={handleUserId}/>
            <input type="password" value={password.value} onChange={handlePassword}/>
            <button type="submit">로그인!</button>
        </form>
    )
}

    /*
        1. 사용자가 입력한다.
        2. userid에 한 글자가 담긴다.
        3. setState에 담는다 => handler함수 필요

        setState에 값을 담으면 그만 아님?
        어떻게 담을까?
        이벤트를 먼저 기억해

        onChange => 누구한테 
    */
