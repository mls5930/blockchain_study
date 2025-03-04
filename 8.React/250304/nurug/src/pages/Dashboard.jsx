import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const Dashboard = () => {
    const {user} = useAuth();
    return (
        <div>반가워 {user}야</div>
    )
}