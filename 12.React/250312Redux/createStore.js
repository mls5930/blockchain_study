// Redux의 핵심: createStore
// - 내부적으로 상태(state)를 저장하고
// - dispatch(action)으로 리듀서 실행
// - subscribe(listener)로 상태 변경을 감지

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

export function createStore(reducer, initialState) {
    let state = initialState;      // 현재 상태를 저장할 변수
    let listeners = [];            // 상태 변경 시 실행할 구독자 목록
  
    // 현재 상태 반환
    function getState() {
      return state;
    }
  
    // 액션을 받아 리듀서 실행 → 새로운 상태 갱신 → 구독자들에게 알림
    function dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    }
  
    // 상태가 바뀔 때마다 호출할 함수를 등록
    // - 호출한 함수(subscribe)에 리턴된 함수로 "구독 해제" 가능
    function subscribe(listener) {
      listeners.push(listener);
      return () => {
        // 구독 해제 로직
        listeners = listeners.filter((l) => l !== listener);
      };
    }
  
    // 초기 상태 설정(리듀서를 통해 초기화)
    // - Redux는 '@@redux/INIT' 같은 특수 액션을 사용하지만 여기선 간단히 처리
    dispatch({ type: "@@INIT" });
  
    // 스토어 객체 반환
    return {
      getState,
      dispatch,
      subscribe,
    };
  }
  