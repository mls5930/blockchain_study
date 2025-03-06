// 카운터로 보는 reducer 예제

// 1. 초기값 설정 (useState)
// const [state, setState] = useState({ count : 0 })

 let state = { count: 0 }

// 리듀서 함수 정의
const counterReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {...state, count: state.count + 1}
            // return {count: 1}
        case "DECREMENT":
            return {...state, count: state.count - 1}
    }
}

// 패치 함수 정의
/*
    action: {
        type: DECREMENT
    }
*/
const dispatch = (action) => {
    // counterReducer?
    // 반환값인 객체값을 state에 다시 재할당함.
    // const [state, setState] = useState({count:0})
    // setState({count: state.count + 1})
    //state = counterReducer(state, action);
    const newState = counterReducer(state, action);
    state = newState
}

// Counter UI가 있다고 칠게요

// 먼저 +를 눌렀다고 한다면?
dispatch({type: "INCREMENT"});
dispatch({type: "INCREMENT"});
dispatch({type: "DECREMENT"});

console.log(state);
