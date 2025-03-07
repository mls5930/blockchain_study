import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

/*
    로그인을 하자!

    1. 입력값 입력함
    2. 버튼 땅 때림
    3. user값이 있으면 /dashboard 이동 없으면 /login 이동
*/
export const Login = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    
    const handleUserId = (e) => {
        setUserId(e.target.value)
    }
    const handleUserPw = (e) => {
        setUserPw(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userId === "wnqudgus1234" && userPw === "qwer1234") {
            navigate("/dashboard ");
            setUser("wnqudgus1234");
        } else {
            navigate("/login");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={userId}
                onChange={handleUserId}
            />
            <input
                type="text"
                placeholder="Password"
                value={userPw}
                onChange={handleUserPw}
            />
            <button type="submit">Login</button>
        </form>
    )
}