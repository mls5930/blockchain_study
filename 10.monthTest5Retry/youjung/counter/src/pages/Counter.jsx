import React, { useEffect, useState } from "react";
import { StyledButton  } from "../styled";
import { StyledWrapper, StyledLeftWrapper, StyledRightWrapper } from "../layouts";
import { getCounter, postCounter } from "../api/counter"
import { counterReducer } from "../reducers/countReducer"

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"

export const Counter = () => {
    const [count, setCount] = useState(0)
    const [history, setHistory] = useState([])

    const getHistory = (result) => {
        const history = result.map((value) => value.createdAt);
        return history
    }

    useEffect(() => {
        ;(async()=> {
            const result = await getCounter();
            const history = getHistory(result);
            setCount(result[0].value);
            setHistory(history)
        })()
    }, [])

    const handleDispatch = async(action) => {
        try {
            const newCount = counterReducer(action, count)
            await postCounter(newCount)
            const result = await getCounter();
            const history = getHistory(result);
            setCount(newCount)
            setHistory(history)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StyledWrapper>
            <StyledLeftWrapper>
                {count}
                <StyledButton onClick={() => handleDispatch({type: INCREMENT})}>+</StyledButton>
                <StyledButton onClick={() => handleDispatch({type: DECREMENT})}>-</StyledButton>
                <StyledButton onClick={() => handleDispatch({type: RESET})}>RESET</StyledButton>
            </StyledLeftWrapper>
            <StyledRightWrapper>
                {
                    history.length <= 0 ? "값이 없습니다." : 
                    <ul>
                        {history.map((value, index) => (
                            <React.Fragment key={index}>
                                <li>{value}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                }
            </StyledRightWrapper>
        </StyledWrapper>
    )
}


    /*
        1. 카운트 값 가져올 것 => GET /counter
        2. 눌렀을 때 dispatch => POST /counter
    */