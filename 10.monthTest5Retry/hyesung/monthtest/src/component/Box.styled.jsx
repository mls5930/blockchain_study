import styled from "styled-components";

const Box = styled.div`
    padding: 20px 0 ;
    margin: 20px auto;
    max-width: 1000px;
    max-height: 600px;
    background-color: #9e9e9e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    .counter {
        display: flex
    }
`

export const StyledBox = ({children, ...rest}) => {
   return (
        <Box {...rest}>{children}</Box>
   )
}