import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../hooks/contexts/AuthContext";

export const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
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
            setUser("wnqudgus1234");
            navigate("/dashboard ");
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