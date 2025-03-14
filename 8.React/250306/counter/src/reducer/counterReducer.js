export const counterReducer = (action, state) => {
    switch (action) {
        case "INCREMENT":
            return state.count + 1;
        case "DECREMENT":
            return state.count - 1;
        case "DELETE":
            return 0;
        default:
            break;
    }
}
