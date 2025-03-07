export const counterReducer = (state,action) => {
    switch (action.type) {
        case "INCREMENT":
                                            //0+1
                                            console.log(state);
                                            
            return {...state , count: state.count+1}
        case "DECREMENT":
                                            //0-1
            return {...state , count: state.count-1}
    }
}