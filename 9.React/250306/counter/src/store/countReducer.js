
export const countReducer =  (state,action) =>{  
    switch(action.type) {
        case"SET_DATA":
            return {
                ...state, ...action.payload 
        }
        case"INCREMENT":
            return{
                ...state,value: state.value + 1 
        }
        case"DECREMENT":
            return{
                ...state,value: state.value - 1
        }
        case"RESET":
            return{
                ...state,value: 0
        }
        
    }
  
}