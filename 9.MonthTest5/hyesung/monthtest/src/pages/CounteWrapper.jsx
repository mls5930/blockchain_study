
import React, {useState,useEffect} from "react";
import styled from "styled-components";
import Counter from "./counter"
import Time  from "./Time"
import Time  from "./"
const StyledBox = styled.div`
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
export const CounteWrapper = () => {

    const [state,setstate] = useState(
        {
            count:0,
            time:null
        }
    )

    useEffect(() => {
        if(state.count != null) {
            return setstate({
                ...state, 
                time: state.time ? [...state.time, "업로드"] : ["업로드"]
            });
        }else {
            return setstate({
                count:null,
                time:null
            })
        }
       
    }, [state.count])

    return(
        <StyledBox>
            <div>
            <div>count{state.count}</div>
                <div className="counter">  
                    <Counter state={state} setstate={setstate}/>
                    <Time state={state} />
                </div>
            </div>
        </StyledBox>
    )
}
export default CounteWrapper