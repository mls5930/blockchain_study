import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CustomHookTest = () => {
    const [userid, setUserId] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();

    const navigate = useNavigate();

    const handleUserId = (e) => {
        setUserId(e.target.value)

    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    

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
            <input type="text" value={userid} onChange={handleUserId}/>
            <input type="password" value={password} onChange={handlePassword}/>
            <input type="email" value={email} onChange={handleEmail}/>
            <input type="text" value={address} onChange={handleAddress}/>
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