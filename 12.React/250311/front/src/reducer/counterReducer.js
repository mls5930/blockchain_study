import {INCREMENT, DECREMENT} from "../pages/Counter"

export const countReducer = (count, action) => {
    switch (action.type) {
        case INCREMENT:
            return count + 1;
        case DECREMENT:
            return count - 1;
        case DECREMENT:
            return count - 1;
        default:
            return count; 
    }
};