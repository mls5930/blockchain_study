import { createStore, combineReducers } from "redux";
import { counterReducer } from "./countreducer";
import { userLogin } from "./userreducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userLogin,
});

export const store = createStore(rootReducer);
