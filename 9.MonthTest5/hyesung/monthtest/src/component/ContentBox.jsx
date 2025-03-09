import styled from "styled-components";
 const ContentBox = styled.div`
 margin-top: 10px;
    height: 200px;
    width: 400px;
    border: solid 1px red;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
   
    gap: 10px;
    & > button {
        background-color: wheat;
        border-radius: 5px;
    }
    & > div {
        display: flex;
        flex-direction: column;
        gap: 50px;
        
    }
`
export default ContentBox