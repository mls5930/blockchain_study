import { INCREMENT, DECREMENT, RESET } from "../pages/Count"

export const counterReducer = (action, count) => {
    switch(action.type){
        case INCREMENT:
        return count + 1
        case DECREMENT:
        return count - 1
        case RESET:
        return 0
    }
}
