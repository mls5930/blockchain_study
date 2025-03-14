
import { styled } from "styled-components";

const Wrapper = styled.div`
    border: 1px solid lightgrey;
    gap: 16px;
    display: flex;
    align-items: center;
    width: 1000px;
    height: 600px;
    margin: 0 auto;
`

export const StyledWrapper = ({children, ...rest}) => {
    return (
        <Wrapper {...rest}>{children}</Wrapper>
    )
}