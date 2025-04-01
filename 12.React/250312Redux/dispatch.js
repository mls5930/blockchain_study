// 해당 내부 구조는 내부 동작이 어떻게 흘러가는지에 대한 대략적인 코드입니다.
// 해당 코드는 흐름 파악으로만 체크해주세요 제발 ㅠㅠㅠㅠㅠ

import { useEffect, useState } from "react";

const initialState = {
    count: 0,
    history: []
};

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETDATA:
            return { ...state, ...action.payload };
        case INCREMENT:
            return { ...state, ...action.payload };
        case DECREMENT:
            return { ...state, ...action.payload };
        case RESET:
            return { ...state, count: 0, history: [] };
        default:
            return state;
    }
};

export const useDispatch = () => {
    const dispatch = (type, payload) => {
        let init;

        useEffect(()=> {
            init = counterReducer(initialState);
        }, [])

        const [count, setCount] = useState(init.count);
        const [history, setHistory] = useState(init.history);

        if(type) {
            const action = {type, payload}
            const result = counterReducer({count, payload}, action);
            setCount(result.count);
            setHistory(result.history);
        }

        return {
            count,
            history
        }
    }
    return dispatch
}

const dispatch = useDispatch()
dispatch({type: INCREMENT, payload: {count: count + 1, history: [...history]}})

export const useSelector = () => {

    const [count, setCount] = useState(count);
    const [history, setHistory] = useState(history);

    return {
        count,
        history
    }
}

const {count, history} = useSelector((state) => state)