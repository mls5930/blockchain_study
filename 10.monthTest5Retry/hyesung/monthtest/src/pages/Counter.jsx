
import React, {useState, useEffect, useCallback} from "react";
import { Count } from "./Count"
import { Time }  from "./Time"
import { StyledBox } from "../component";
import { getCounter, postCounter } from "../api/counter"
import { counterReducer } from "../reducer/counterReducer"

export const Counter = () => {

    const [count, setCount] = useState(0);
    const [time, setTime] = useState([]);

    useEffect(() => {
        ;(async () => {
            try {
                const { count: latestCount, time } = await getCounter();
                setCount(latestCount);
                setTime(time);
            } catch (error) {
                console.error("Error fetching counter data:", error);
            }
        })();
    }, []);

    const patchData = useCallback(async(newCount) => {
        const { time } = await getCounter();
        setCount(newCount)
        setTime(time)
    }, [])

    const handleDispatch = async(action) => {
        try {
            const newCount = counterReducer(action, count);
            await postCounter(newCount);
            patchData(newCount)
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <StyledBox>
            <div>
                <div>count: {count}</div>
                <div className="counter">  
                    <Count handleDispatch={handleDispatch}/>
                    <Time time={time} />
                </div>
            </div>
        </StyledBox>
    )
}
