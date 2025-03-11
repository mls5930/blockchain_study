import {INCREMENT, DECREMENT} from "../pages/Counter"

export const countReducer = (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state; 
    }
};