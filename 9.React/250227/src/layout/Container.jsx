import styled from "styled-components";
import React from "react";
const Container = styled.div`
    color: green;
    display: flex;
    gap: 10px;
`

 const StyleContainer = (props) => {
    return(
    <Container>
        <div>나는 텍스트</div>
        <div>{props.id}</div>
        {props.children}
    </Container>
    )
}
console.log("함수",StyleContainer);


export default StyleContainer