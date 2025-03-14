import { Container, DivLeft, DivRight, Button,
    DivLeftTop, DivLeftBottom
 } from "../styled/Count";
import React, { useContext, useEffect, useRef  } from "react";
import axios from "axios";
import {CountContext} from '../store/index'

export const Count = () =>{
    const {state, dispatch, history, setHistory} = useContext(CountContext);
    const countRef = useRef(state.count);
    const historyRef = useRef(history);
    
    const postCount = async(action) =>{    
        dispatch(action);
        setTimeout(async () => {
            console.log("최신 상태 (useRef):", countRef.current);
            console.log("최신 상태 (historyRef):", historyRef.current[0]);
            const response = await axios.post('http://localhost:3005/count',
                {
                    value : countRef.current,
                },
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })

            setHistory((prevHistory) => [...prevHistory, response.data]);
        }, 0);
    }

    const getHistory = async(id) =>{
        alert(id);
    }

    useEffect(()=>{
        countRef.current = state.count;  
    },[state.count])

    useEffect(()=>{
        historyRef.current = history;  
    },[history])
    
    return(
        <>
            <Container>
                <DivLeft>
                    <DivLeftTop>
                        Count : {state.count}
                    </DivLeftTop>
                    <DivLeftBottom>
                        <Button onClick={() => postCount({type:"INCREMENT"})}> + </Button>
                        <Button onClick={() => postCount({type:"DECREMENT"})}> - </Button>
                        <Button onClick={() => postCount({type:"RESET"})}> RESET </Button>
                    </DivLeftBottom>
                </DivLeft>
                <DivRight>
                    <ul>
                        {!history ? "로딩중" : history.slice(-17).map((item, index) =>(
                            <li onClick={() => getHistory(item.id)} key={index}> Log: {item.createdAt}</li>
                        )) }
                    </ul>
                </DivRight> 
            </Container>
        </>
    )
}
