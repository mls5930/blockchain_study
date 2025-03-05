import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer"
export const AppContext = createContext(null);

const init = {
    count: 0,
    isLogin: false
}
/*
    "{}"
    {}
*/
const getInit = () => {
    const appState = localStorage.getItem("appState");
    return appState ? JSON.parse(appState) : init
}

export const AppProvider = ({children}) => {
    console.log("AppProvider 재 생성됨?");
    const [state, dispatch] = useReducer(reducer, getInit())

    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(state))
    }, [state])

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}
