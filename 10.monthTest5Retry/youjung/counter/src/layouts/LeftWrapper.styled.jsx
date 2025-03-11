import { styled } from "styled-components";

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    border: 1px solid lavender;
    display: flex;
    width: 50%;
    height: 60%;
    margin: 0 auto;
`
export const StyledLeftWrapper = ({children, ...rest}) => {
    return (
        <LeftWrapper {...rest}>{children}</LeftWrapper>
    )
}