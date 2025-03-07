import React, { useState } from "react"
// import './main.css'
import StyledButton from "../compornents/Button"
import StyledText from "../compornents/Text"
import StyleContainer from "../layout/Container"

const Main = () => {
    const [color, setColor] =useState("blue")
    const [Pcolor, setPcolor] = useState("")

    const handleColor = (e) => {
        setPcolor("red")
        console.log("a");
        
    }

    return (
        <>
            <StyleContainer className="id">
                <p className="text">주</p>
                <p className="text">병</p>
                <p className="text">현</p>
                <p className="text">교</p>
                <p className="text">강</p>
                <p className="text">사</p>
                <p className="text">님</p>
                <p className="text">수</p>
                <p className="text">업</p>
                <p className="text">시</p>
                <p className="text">간</p>
                <p className="text">에</p>
                <p className="text">침</p>
                <p className="text">착</p>
                <p className="text">맨</p>
                <p className="text">봄</p>
            </StyleContainer>
            <StyledText color={Pcolor}>나는 바뀌나?</StyledText>
            <StyledButton color={color} onClick={handleColor}>나는 스타일드 버튼 컴포넌트</StyledButton>
        </>
    )
}


export default Main