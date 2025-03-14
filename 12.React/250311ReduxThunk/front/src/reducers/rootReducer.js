import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { counter2Reducer } from "./counter2Reducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
    count: counterReducer,
    count2: counter2Reducer,
    auth: authReducer
})

export default rootReducer