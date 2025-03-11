import React from "react";
import { StyledContentBox } from "../component"

export const Time = ({time}) => {
    return(
        <StyledContentBox>
            <div className="textBox">
                {time.length <= 0 ? "값이 없습니다." : time.map((value, index) =>{
                    return <p key={index}>{value}</p>
                })}
            </div>
        </StyledContentBox>
    )
}