const init = {
    userid: "",
    userpw: "",
    error_message: ""
}
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, ...action.payload}
        case AUTH_FAILURE:
            return { error_message: action.payload.error_message}
        default:
            return state; 
    }
};