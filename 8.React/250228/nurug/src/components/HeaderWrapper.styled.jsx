import { styled } from "styled-components";

const HeaderWrapper = styled.div`
    padding: 10px 20px;
    background: #333;

    ul {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    /* ul > li > a {
        color: yellow;
    } */
` 

export const StyledHeaderWrapper = ({children, ...rest}) => {
    return <HeaderWrapper {...rest}>{children}</HeaderWrapper>
}