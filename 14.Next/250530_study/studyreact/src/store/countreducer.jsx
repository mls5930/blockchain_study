// store.ts
import { createStore } from "redux";

const countState = { count: 1 }

export const counterReducer = (state = countState, action) => {
    switch (action.type) {
        case "MULTIPLY":
            return { count: state.count * 2 }
        case "DIVLDE":
            return { count: state.count / 2 }
        default:
            return state;
    }


}

// export const countReducer = createStore(counterReducer)