import React, {useContext} from "react";
import { AuthContext } from "../hooks/contexts/AuthContext";
// import { useAuth } from "../hooks/contexts/AuthContext";

export const Dashboard = () => {
    const { user } = useContext(AuthContext)
    
    // const {user} = useAuth();
    return (
        <div>반가워 {user}야</div>
    )
}