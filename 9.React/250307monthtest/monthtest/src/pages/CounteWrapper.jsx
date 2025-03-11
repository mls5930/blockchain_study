
import React, {useState,useEffect, useRef} from "react";
import styled from "styled-components";
import Counter from "./Counter"
import Time  from "./Time"
import axios from "axios"
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
            time:[]
        }
    )
    const [load, setLoad] = useState(false);
    const stateref = useRef(state.count);
    

    useEffect( () => {
        const dataFetch = async() => {
        const [data] = (await axios.get("http://localhost:3005/counter")).data
            setstate({
                count:data.value,
                time:[data.createdAt]
            });
            
        }
        dataFetch()
    },[])

    
    useEffect(() => {
        const postData = async () => {

            try {
                const newValue = state.count;
                // console.log("보내는 값:", newValue);
                
                const { data } = await axios.post("http://localhost:3005/counter", { newValue });
                // console.log("받은 데이터:", data);
                const updateTime = state.time ? [...state.time, data.createdAt] : [data.createdAt];
                if(state.count != null) {
                    setstate({
                        count: state.count, 
                        time: updateTime
                    });
                    
                }else {
                    setstate({
                        count:null,
                        time:[]
                    })
                }
            } catch (error) {
                console.error("POST 요청 실패:", error);
                return null;
            }
        };

        if(stateref.current !== state.count){
            load ? postData() : setLoad(true);
        }
        
    },[state.count])

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