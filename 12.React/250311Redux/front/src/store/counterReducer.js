const initialState = {
    count: 0,
    history: []
};

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETDATA:
            /*
                [
                    {
                        id:1,
                        createdAt: "2025-11-12"
                    }
                ]
            */
            return { ...state, ...action.payload };
        case INCREMENT:
            return { ...state, ...action.payload };
        case DECREMENT:
            return { ...state, ...action.payload };
        case RESET:
            return { ...state, count: 0, history: [] };
        default:
            return state;
    }
};