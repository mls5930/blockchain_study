import { INCREMENT, DECREMENT, RESET, SETDATA } from "."

export const countReducer = (state, action) => {
    switch (action.type) {
        case SETDATA:
            return {...state, ...action.payload}
        case INCREMENT:
            return {...state, ...action.payload}
        case DECREMENT:
            return {...state, ...action.payload}
        case RESET:
            return {...state, ...action.payload}
        default:
            return state; 
    }
};