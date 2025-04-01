import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT, INCREMENT, SETDATA } from "../../store/counterReducer";
import {getCount, postCount} from "../../api/counter"
import { getHistory, getInit } from "./getData"

export const Counter = () => {
    const dispatch = useDispatch();
    
    const { count, history } = useSelector((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInit();
                dispatch({ type: SETDATA, payload: data });
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        };
        fetchData();
    }, []);

    const handleDispatch = async (type, newValue) => {
        try {
            await postCount(newValue); // 새로운 값 저장
            const result = await getCount(); // 최신 데이터 불러오기
            const updatedHistory = getHistory(result);
            dispatch({ type, payload: { count: result[0].value, history: updatedHistory } });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };

    if (history.length <= 0) return <>값이 없음!</>;

    return (
        <>
            {count}
            <button onClick={() => handleDispatch(INCREMENT, count + 1)}>+</button>
            <button onClick={() => handleDispatch(DECREMENT, count - 1)}>-</button>
            <ul>
                {history.map((value) => (
                    <React.Fragment key={value.id}>
                        <li>{value.createdAt}</li>
                    </React.Fragment>
                ))}
            </ul>
        </>
    );
};