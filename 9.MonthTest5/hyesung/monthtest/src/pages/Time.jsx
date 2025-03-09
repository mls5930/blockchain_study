import React from "react";
import { useCounter } from "../store/CountProvider";
import ContentBox from "../component/ContentBox"
 const Time = () => {
    const {state,setstate} =useCounter()
    console.log(state);
    const stateTime = () =>{
        
    }

    return(
        <ContentBox>
            <div>
                <p>{state.time}</p>
            </div>
        </ContentBox>
    )
}
export default Time