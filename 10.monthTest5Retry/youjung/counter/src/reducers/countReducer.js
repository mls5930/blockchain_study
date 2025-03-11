import { DECREMENT, INCREMENT, RESET } from "../pages/Counter";

export const counterReducer = (action, count) => {
    switch (action.type) {
        case INCREMENT:
            return count + 1;
        case DECREMENT:
            return count - 1;
        case RESET:
            return 0
        default:
            break;
    }
}