import React from "react";
import ContentBox from "../component/ContentBox"
 const Time = ({state}) => {
    console.log(state.time);
    
    return(
        <ContentBox>
            <div className="textBox">
                {!state.time? "로딩중" : state.time.map((value, index) =>{
                    return <p key={index}>{value}</p>
                })}
            </div>
        </ContentBox>
    )
}
export default Time