import { createContext, useState } from "react";

// 1. Context 생성
// 값이 null이지만, AuthProvider에서 내용을 채워줄거임
export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState()

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

// 3. Context를 쉽게 사용할 수 있도록 하는 커스텀 훅
// export const useAuth = () => useContext(AuthContext);

/*
    모듈로 내보낸거

    AuthProvider 컴포넌트: App.jsx에 최상단에 선언할 컴포넌트
    useAuth: 전역 상태를 꺼내쓰기 커스텀 훅
*/