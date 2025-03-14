import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;

    p {
        color: yellow
    }
`
/*
    props = {
        username: "wnqudgus1234",
        children: [
            {

            },{},{}
        ]
    }
*/
const StyledComponent = ({children, ...rest}) => {
    return (
        <Container {...rest}>
            {children}
        </Container>
    )
}

export default StyledComponent