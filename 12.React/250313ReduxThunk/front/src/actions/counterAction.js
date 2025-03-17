import { postCount } from "../api/counter";
import { getData } from "../pages/counter/getData";
import { COUNT_SETDATA } from "../reducers/counterReducer";

export const fetchSetData = () => {
    return async (dispatch) => {
        const data = await getData();
        dispatch({ type: COUNT_SETDATA, payload: data });
    };
};

// 원래 이름 handleDispatch
export const updateCount = (type, newValue) => {
    return async (dispatch) => {
        await postCount(newValue);
        const data = await getData();
        dispatch({ type, payload: { ...data } });
    };
};