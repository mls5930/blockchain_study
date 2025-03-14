import { styled } from "styled-components";

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightblue;
    width: 56px;
    height: 35px;
    border: none;
    border-radius: 8px;
`

export const StyledButton = ({children, ...rest}) => {
    return (
        <Button {...rest}>{children}</Button>
    )
}