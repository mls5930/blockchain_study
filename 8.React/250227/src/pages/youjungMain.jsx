import React, {useState} from "react";
// import "./main.css"
import StyledText from "../components/YoujungText";
import StyledContainer from "../layouts/Container.styled";

const Main = () => {
    const [color, setColor] = useState("")

    const habndleChange = (e) => {
        console.log(color);
        
        // color === "red" ? setColor("blue"): setColor("red")
        if(color === "red") {
            setColor("blue")
        } else{
            setColor("red")
        }
        
    }
    /*
        props = {
            className: "css-main",
            color: "red" | "blue"
        }
    */
    // const StyledText = (props) => {
    //     console.log(props.className);
    //     console.log(props.color);
        
    // }
    // StyledText(props)
    return (
        <StyledContainer username="wnqudgus1234">
            <StyledText className="css-main" color={color}>나는 기존 css로 작성한 빨간색 글자</StyledText>
            <button onClick={habndleChange}>
                i'm styledButton component
            </button>
        </StyledContainer>
    )
}

export default Main