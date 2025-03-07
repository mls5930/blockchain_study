// Context => 환경
// useContext 전역에서 설정할 수 있는 환경
/*
    createCoutext: 환경설정
    useContext : 실질적인 환경 생성
    useState:전역상태
*/

import { createContext, useContext ,useEffect, useState, useReducer} from "react";
import { counterReducer } from "./counterReducer" //리듀서
import { loginReducer } from "./studyReducer";
export const CounterContext = createContext(null);


// 로컬 스토리지
const getInit = () => {
    const localCount = localStorage.getItem("count")
    return localCount ? {count: JSON.parse(localCount)} : {count:0}
}
const getLogin = () => {
    const localLogin = localStorage.getItem("login");
    return localLogin ? { login: JSON.parse(localLogin) } : { login: false };
};
export const CounterProvider = ({children}) => {
    // 전역 상태 선언
    // 로컬스토리지에 "count" 키 값이 존재함?
    // 있으면 파싱해서 가져옴
    console.log("CounterProvider 재생성됨?");
    

    // const [state,dispatch] =useReducer([리듀서함수],[초기 값])

    const [state,dispatch] = useReducer(counterReducer , getInit());
    const [statelogin, dispatchlogin] = useReducer(loginReducer, getLogin());

    console.log(statelogin);
    
    useEffect(() => {
        localStorage.setItem("count" ,JSON.stringify(state.count))
      
    },[state.count])

    useEffect(() => {
        localStorage.setItem("login" ,JSON.stringify(statelogin.login))
        console.log("나는 로그인 상태");
        
    },[statelogin.login])
   
    return(
        <CounterContext.Provider value={{state, dispatch ,statelogin,dispatchlogin}}>
            {children}
        </CounterContext.Provider>   
    )
}

// 커스텀 훅으로 내보냄
// export const useCounter = () => useContext(CouterContext)


// 카운터 적용전

// const [login, setLogin] = useState(()=> {
//     const lacalUsser = localStorage.getItem("isLogin");
//     return lacalUsser ? JSON.parse(lacalUsser): false
// })


// useEffect(() => {
//     localStorage.setItem("count" ,JSON.stringify(count))
//     localStorage.setItem("isLogin" ,JSON.stringify(login))
// },[count,login])
