import { createContext, useContext, useState} from "react"

// 1. Context 생성
// 값이 null 이지만 AuthProvider에서 내용을 채워줌.
const AuthContext =createContext(null);

// 2. Context Provider 생성
export const AuthProvider = ({children}) => {
    // 전역 상태라고 부름
    // 즉, 어떤 컴포넌트에서도 해당 변수에 접근 가능함.
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
//  3. Cintext를 쉽게 사용할 수 있도록 하는 커스텀 훅
export const useAuth = () => useContext(AuthContext);


/*
    모듈로 내보낸거
    
    Authprovider 컴포넌트: App.jsx에 최상단에 선얼할 컴포넌트
    useAuth: 전역 상태를 꺼내쓰기 커스텀 훅.
*/