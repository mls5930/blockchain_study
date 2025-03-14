import React, { useState } from "react";
// import './main.css'
import StyledButton from "../components/Button";
import StyledText from "../components/Text";

const Main = () => {
    const [color, setColor] = useState("red")

    const handleChnageColor = () => {
        setColor("blue")
    }

    return (
        <>
            <StyledText className="css-main" color={color}>나는 초기 빨간색</StyledText>
            <StyledButton onClick={handleChnageColor}>나는 스타일드 버튼 </StyledButton>
        </>
    )
}

export default Main