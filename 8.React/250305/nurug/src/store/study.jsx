// AppContext이름이 같은데 어떻게 동작할 수 있는지?
import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";

const init = {
    count: 0,
    isLogin: false,
    userid: "",
    userpw: ""
}

const getInit = () => {
    const appState = localStorage.getItem("appState");
    return appState ? JSON.parse(appState) : init
}

// 1. 환경 "자체"를 만드는 그릇 먼저 생성
// createContext
export const AppContext = createContext(null);

// 2. 전역 컴포넌트(Provider) 생성 후, 상태 및 return 작성
export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, getInit());
    
    useEffect(()=> {
        localStorage.setItem("appState", JSON.stringify(state));
    }, [state])

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}