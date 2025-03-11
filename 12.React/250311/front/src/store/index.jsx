import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { countReducer } from "./counterReducer";
import { getCount, postCount } from "../api";

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    const getHistory = (result) => {
        return result.map((value) => ({
            id: value.id,
            createdAt: value.createdAt
        }));
    };

    const getInit = async () => {
        const result = await getCount();
        const history = getHistory(result);
        return { count: result[0].value, history };
    };

    const [state, dispatch] = useReducer(countReducer, { count: 0, history: [] });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInit();
                dispatch({ type: SETDATA, payload: data });
                setIsInitialized(true);
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        };
        fetchData();
    }, []);

    const handleDispatch = async (action) => {
        try {
            const value = await postCount(action.payload);
            const result = await getCount();
            const history = getHistory(result);
            const payload = { count:value, history };
            dispatch({ type: action.type, payload });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>; // 초기 로딩 화면 표시
    }

    return (
        <AppContext.Provider value={{ state, handleDispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useCounter = () => useContext(AppContext);