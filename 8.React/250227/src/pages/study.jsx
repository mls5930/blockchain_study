import React, { useState } from "react";
// import './main.css'
import StyledContainer from "../layouts/Container";
import StyledButton from "../components/Button";

const Study = () => {
    const [color, setColor] = useState("red")

    const handleChnageColor = () => {
        setColor("blue")
    }

    return (
        <StyledContainer className={"imContainer"} username={"imUser"}>
            <p className="title" color={color}>시사</p>
            <StyledButton onClick={handleChnageColor}>나는 스타일드 버튼 </StyledButton>
        </StyledContainer>
    )
}

export default Study
    /*
        props = {
            a: "dd",
            b: "bb"
        }
    */
    // const a = (props) => {

    // }

    // a({a:"dd", b:"bb"})
/*
    const container = React.createElement("div", null, () => {
        React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("button", {onClick: handleChnageColor}, "나는 스타일드 버튼")
    })
*/