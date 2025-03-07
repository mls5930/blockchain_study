import React from "react";
import { useCounter } from "../store/CountProvider";
import ContentBox from "../component/ContentBox"
 const Counter = () => {
    const {state,setstate} =useCounter()
    console.log(state);
    const enventhandle = (e) =>{

        switch(e){
            case"INCREMENT":
            return setstate({...state , count:state.count+1})
            case"DECREMENT":
            return setstate({...state , count:state.count-1})
            case"RESET":
            return setstate({...state , count:state.count= null})
        }
      
        
    }

    return(

        <ContentBox>
            <button onClick={() => enventhandle("INCREMENT")}>+</button>
            <button onClick={() => enventhandle("DECREMENT")}>-</button>
            <button onClick={() => enventhandle("RESET")}>리셋버튼</button>
        </ContentBox>
    
    )
}

export default Counter