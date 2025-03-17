import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authMe } from "../../actions";

export const Login = () => {
    const [userid, setUserid] = useState("");
    const [userpw, setUserPw] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authMe())
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)}/>
            <input type="text" value={userpw} onChange={(e) => setUserPw(e.target.value)}/>
            <button>버튼</button>
        </form>
    )
}