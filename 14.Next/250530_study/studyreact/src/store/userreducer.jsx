import { createStore } from "redux";

const loginData = {
    ID: "user",
    PS: "pass",
};

const initialState = {
    message: "",
};

export const userLogin = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            const { id, ps } = action.payload;
            const success = id === loginData.ID && ps === loginData.PS;
            return {
                ...state,
                message: success ? "로그인 성공" : "로그인 실패",
            };

        default:
            return state;
    }
};

// export const userstore = createStore(userLogin)