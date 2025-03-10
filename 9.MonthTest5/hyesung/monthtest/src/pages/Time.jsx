import React from "react";
import ContentBox from "../component/ContentBox"
 const Time = ({state}) => {

    return(
        <ContentBox>
            <div>
                <p>{state.time}</p>
            </div>
        </ContentBox>
    )
}
export default Time