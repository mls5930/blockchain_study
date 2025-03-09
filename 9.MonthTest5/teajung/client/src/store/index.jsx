import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";
import { countReducer } from "./countReducer";
import axios from 'axios';

export const CountContext = createContext(null);

export const CountProvider = ({children}) =>{    
    const [state, dispatch] = useReducer(countReducer, ({
        count : 0,
    }));
    const [history, setHistory] = useState([]);
    
    const getCount = useCallback(async () => {
        try {
            const response = (await axios.get("http://localhost:3005/count")).data;
            console.log("res" , response);
            if (response.length > 0) {
                dispatch({ type: "LOAD", value: response[0].count });
                
                setHistory((prevHistory) => [...prevHistory, ...response]);
                
            }
        } catch (error) {
            console.error("Error fetching count:", error);
        }
    }, []);

    useEffect(() => {
        getCount();
        
    }, [getCount]);
    
    return(
        <CountContext.Provider value={{state, dispatch, history, setHistory}}>
            {children}
        </CountContext.Provider>
    );
}