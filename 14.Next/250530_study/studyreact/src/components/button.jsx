import styled from "styled-components"

const StyleBtn = styled.div`
    color: red;
    padding: 10px 30px;
    border-radius: 20px;
    background:brown;
`


export const Button = ({ children, onClick }) => {
    return (<StyleBtn onClick={onClick}>
        {children}
    </StyleBtn>)
}