import React from "react"
import Main from "./pages/main"
import { ThemeProvider } from "styled-components"

// 스타일드 컴포넌트를 적용해야 함.

const App = () => {
    const colorChip={
        blue:"#228be6"
    }
    return(
        // 공통으로 적용할 생깔 => 테마 도우미
        <ThemeProvider theme={colorChip}>
            <Main />
        </ThemeProvider>
    )
    
}

export default App