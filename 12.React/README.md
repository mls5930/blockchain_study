# 오늘 할 것

카운터 구현

1. useState를 이용한 기본 카운터 기능 구현
2. useContext 적용 (전역 상태 관리)
3. useReducer 적용

## 리덕스(redux, react-redux만) 적용하기

### Redux 설정

- redux 및 react-redux를 설치하고 Redux Store 생성.
- 기존의 useReducer를 Redux Reducer로 변환.
- store/index.js에서 Redux Store를 관리.

### 전역 상태 변경

- 기존의 useContext + useReducer 구조를 Redux로 대체.
- dispatch({ type }) 형태로 상태를 업데이트.

### 컴포넌트 수정

- useCounter 대신 useSelector, useDispatch를 사용하여 Redux Store와 연동.

## redux-thunk 적용하기

일단 다음과 같은 문제가 발생함.

1. 데이터 패치를 어디서 할 것인가?(불편함 느낌)
2. 데이터 패치에 미들웨어 즉, 중간단계가 필요하다.
3. 리덕스 썽크로 구현하기