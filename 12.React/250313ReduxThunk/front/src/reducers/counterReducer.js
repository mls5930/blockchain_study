const init = {
    count: 0,
    history: []
}

export const COUNT_SETDATA = "COUNT_SETDATA";
export const COUNT_INCREMENT = "COUNT_INCREMENT";
export const COUNT_DECREMENT = "COUNT_DECREMENT";
export const COUNT_RESET = "COUNT_RESET"

export const counterReducer = (state = init, action) => {
    switch (action.type) {
        case COUNT_SETDATA:
            return {...state, ...action.payload}
        case COUNT_INCREMENT:
            return {...state, ...action.payload}
        case COUNT_DECREMENT:
            return {...state, ...action.payload}
        case COUNT_RESET:
            return { count:0, history:[] }
        default:
            return state; 
    }
};