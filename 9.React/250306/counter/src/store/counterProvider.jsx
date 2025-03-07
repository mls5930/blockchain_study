import { useState,createContext,useContext,useReducer, useEffect } from "react";
import { countReducer } from "./countReducer";
import axios from "axios";

const Createbox = createContext(null);
export const AppProvider = ({children}) =>{
    const [data, setData] = useState();

    useEffect(() => {
        const getData = async() => {
            try{
                const {data} = await axios.get("http://localhost:3005/counter")
                setData(data)
            }catch(error){
                console.log(error);
            }
        };
        getData()
    }, []);

    const [state, dispatch] = useReducer(countReducer, data || {});

    useEffect(() => {
        dispatch({type: "SET_DATA", payload: data})
    }, [data])
    
    return(
        <Createbox.Provider value={{state,dispatch}}>
            {children}
        </Createbox.Provider>
    )
}
export const useData = () => useContext(Createbox)