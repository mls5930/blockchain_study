// 상태를 반환
const init = {
    count: 0,
}

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const counter2Reducer = (state = init, action) => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1}
        case DECREMENT:
            return { count: state.count - 1}
        case RESET:
            return { count: 0 }
        default:
            return state; 
    }
};