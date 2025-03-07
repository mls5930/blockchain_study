export const studyReducer = (state,action) => {
    console.log(state);
    console.log("ac",action);
    
    switch (action.type) {
        case "LOGIN":
            return{...state, islogin:true ,userid:state.userid};
        case "LOGOUT":
            return{...state, islogin:false};
        case"INCREMENT":
            return{...state, count:state.count+1}
        case"DECREMENT":
            return{...state,count: state.count-1}
        
    }
}