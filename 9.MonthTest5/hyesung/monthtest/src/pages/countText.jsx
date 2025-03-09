import React, { Children } from "react";
import { useCounter } from "../store/CountProvider";
import AppBox from "../component/AppBox.jsx"
 const Countertext = (props) => {
    const {state,setstate} =useCounter()

    return(
        <div>
            <div>count{state.count}</div>
            <AppBox>  
                {props.children}
            </AppBox>
        </div>
    )
}
export default Countertext