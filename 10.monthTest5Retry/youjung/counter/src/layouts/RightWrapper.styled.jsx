import { styled } from "styled-components";

const RightWrapper = styled.div`
    border: 1px solid lavender;
    display: flex;
    width: 50%;
    height: 60%;
    margin: 0 auto;
`

export const StyledRightWrapper = ({children, ...rest}) => {
    return (
        <RightWrapper {...rest}>{children}</RightWrapper>
    )
}