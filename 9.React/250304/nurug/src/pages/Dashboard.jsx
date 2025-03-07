import React from "react"
import { useAuth } from "../contexts/AuthContext";


export const Dashboard = () => {
    const {user} = useAuth();
    return (
        <div>
            <div>나는 데시보드</div>
            <div>반가워 {user} 야</div>
        </div>
    )
}