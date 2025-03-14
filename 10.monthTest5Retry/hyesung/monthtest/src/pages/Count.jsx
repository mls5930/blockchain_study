import React from "react";
import { StyledContentBox } from "../component"

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"

export const Count = ({handleDispatch}) => {
    return(
        <StyledContentBox>
            <button onClick={() => handleDispatch({type: INCREMENT})}>+</button>
            <button onClick={() => handleDispatch({type: DECREMENT})}>-</button>
            <button onClick={() => handleDispatch({type: RESET})}>리셋버튼</button>
        </StyledContentBox>
    )
}
