import React ,{useEffect}from "react"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    useEffect(() =>  {
        if(user){
            return navigate("/dashboard")
            
        }else{
            return navigate("/login")
        }
    },[])
    return(
        <>
        </>
    )
}