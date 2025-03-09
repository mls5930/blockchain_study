//리듀서 함수 정의
export const countReducer = (state, action) => {
    switch(action.type){
        case "INCREMENT":
            return {...state, count: state.count + 1}
        case "DECREMENT":
            return {...state, count: state.count - 1}
        case "RESET":
            return {...state, count: 0}
        case "LOAD":
            return {...state, count: action.value}
        default:
            return state;
    }
}