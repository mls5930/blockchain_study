import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput"

/*
    email = {
        value,
        handleChangeInput
    }

    address = {
        value,
        handleChangeInput
    }
*/
export const CustomHookTest2 = () => {
    const userid = useInput("");
    const password = useInput("");
    const email = useInput("");
    const address = useInput("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userid === "wnqudgus1234"&& password === "qwer1234") {
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={userid.value} onChange={userid.handleChangeInput}/>
            <input type="password" value={password.value} onChange={password.handleChangeInput}/>
            <input type="email" value={email.value} onChange={email.handleChangeInput}/>
            <input type="text" value={address.value} onChange={address.handleChangeInput}/>
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