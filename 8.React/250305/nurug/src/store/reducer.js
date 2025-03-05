export const reducer = (state, action) => {
    
    switch (action.type) {
        case "INCREMENT":
            return {...state, count: state.count + 1}
            // return {count: 1}
        case "DECREMENT":
            return {...state, count: state.count - 1}
        case "LOGIN": 
            return {...state, isLogin: true, userid: action.payload.userid, userpw: action.payload.userpw }
        case "LOGOUT": 
            return {...state, isLogin: false, userid: "", userpw: ""}
    }
}
