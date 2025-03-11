import { combineReducers } from "redux"
import { countReducer } from "./counterReducer";

const rootReducers = combineReducers({
    count: countReducer
})

export default rootReducers