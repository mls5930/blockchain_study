import React ,{createContext,useReducer,useEffect}from "react";
import {studyReducer} from "./studyReducer"
export const CounterContext = createContext(null);



export const AppProvider = ({children}) => {

    const init = {
        count:0,
        islogin:false,
        userid:"",
        userpw:""
    }
    const getinit = () => {
        const localitem =  localStorage.getItem("localitem")
        return localitem ? JSON.parse(localitem): init
    }

    const [state , dispatch] = useReducer(studyReducer, getinit())

    useEffect(() => {
        localStorage.setItem("localitem",JSON.stringify(state))
    },[state])
    return(
        <CounterContext.Provider value={{state,dispatch}}>
            {children}
        </CounterContext.Provider>
    )
} 