import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer"
export const AppContext = createContext(null);

const getInit = () => {
    const localCount = localStorage.getItem("count");
    return localCount ? { count: JSON.parse(localCount) } : { count: 0 }
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, getInit())

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(state.count))
    }, [state.count])

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}



// 커스텀 훅으로 내보냄
// export const useCounter = () => useContext(AppContext)


// Context => 환경
// useContext 전역에서 설정할 수 있는 환경

/*
    createContext: 환경 설정
    useContext: 실질적인 환경 생성
    useState: 전역 상태

    Provider: 컴포넌트. 데이터를 제공해줄 수 있게 도와주는
*/

/*
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext(null);


리듀서 적용하기 전
// 로컬 스토리지
export const AppProvider = ({children}) => {
    // 전역 상태 선언
    // 로컬스토리지에 "count" 키 값이 존재함?
    // 있으면 파싱해서 저장, 없으면 0이라는 초기값
    console.log("AppProvider 재 생성됨?");
    
    const [count, setCount] = useState(() => {
        const localCount = localStorage.getItem("count");
        return localCount ? JSON.parse(localCount) : 0
    })

    const [login, setLogin] = useState(() => {
        const localUser = localStorage.getItem("isLogin");
        return localUser ? JSON.parse(localUser) : false
    })

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count))
        localStorage.setItem("isLogin", JSON.stringify(login))
    }, [count, login])

    return (
        <AppContext.Provider value={[count, setCount, login, setLogin]}>
            {children}
        </AppContext.Provider>
    )
}

    // const [count, setCount] = useState(() => {
    //     const localCount = localStorage.getItem("count");
    //     return localCount ? JSON.parse(localCount) : 0
    // })

    // const [state, dispatch] = useReducer([리듀서함수], [초기 값])
    // state는 객체값입니다.
*/