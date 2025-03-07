import { styled } from "styled-components"

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #333;
  

    ul {
        display:  flex;
        gap: 20px;
        align-items: center;
    }
    ul > li > a {
        color: yellow;
    }
`
