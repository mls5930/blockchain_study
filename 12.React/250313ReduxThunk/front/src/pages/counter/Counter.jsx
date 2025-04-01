import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { COUNT_INCREMENT, COUNT_DECREMENT } from "../../reducers/counterReducer"
import { fetchSetData, updateCount } from "../../actions";

const Left = () => {
    const { count } = useSelector((state) => state.count);
    const dispatch = useDispatch()
    return (
        <>
            {count}
            <button onClick={() => dispatch(updateCount(COUNT_INCREMENT, count + 1))}>+</button>
            <button onClick={() => dispatch(updateCount(COUNT_DECREMENT, count - 1))}>-</button>
        </>
    )
}

const Right = () => {

    const { history } = useSelector((state) => state.count);
    
    return (
        <ul>
            {history.map((value) => (
                <React.Fragment key={value.id}>
                    <li>{value.createdAt}</li>   
                </React.Fragment>        
            ))}
        </ul>
    )
}

export const Counter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSetData());
    }, [dispatch])
    
    return (
        <>
            <Left/>
            <Right/>
        </>
    )
}