import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
    background: yellow;
    color: gray;
    font-size: 16px;
    display: flex;
    gap: 10px;

    .title:hover {
        color: red;
        font-size: 40px;
        font-weight: 900;
    }
`

const StyledContainer = ({children, ...rest}) => {
    return (
        // <Container {...rest}>
        <Container {...rest}>
            {children}
        </Container>
    )
}

export default StyledContainer

/*
        className: "class",
        userName: "imUser",
        children: [
            {
                나는 p태그
            },
            {
                나는 button
            }
        ]
*/
/*
    props = {
        children :         React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("p", {className: "css-main"}, "시사")
        React.createElement("button", {onClick: handleChnageColor}, "나는 스타일드 버튼")
        className : imContainer
    }
*/