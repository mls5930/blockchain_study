// 카운터로 보는 reducer 예제

// 1. 초기값 설정
let state = {count: 0}

// 리듀서 함수 정의
const counterReducer = (state,action) => {
    switch (action.type) {
        case "INCREMENT":
                                            //0+1
            return {...state , count: state.count+1}
        case "DECREMENT":
                                            //0-1
            return {...state , count: state.count-1}
        case "LOGIN":
                //0-1
            return {...state , isLogin: true}
        case "LOGOUT":
                //0-1
            return {...state , isLogin: false}
    }
}
// 패치 함수 정의
/*
    action: {
        type:INCREMENT
    }
*/

const dispatch = (action) => {
    // counterReducer?
    state = counterReducer(state, action)
}
// Counter UI가 있다고 칠게요

// 먼저 +를 눌렀다고 한다면?

dispatch({type:"INCREMENT"})
dispatch({type:"DECREMENT"})
console.log(state);
