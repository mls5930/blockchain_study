## 저번 수업에는 뭐했을까?

`프론트 배포`

## 저번 수업의 목차

- Nginx란?
    - 리버스 프록시
- 프론트 배포

## 오늘 수업은 뭐할까?

`카운터 구현`  

## 오늘 수업의 목차

1. useState를 이용한 기본 카운터 기능 구현
2. useContext 적용 (전역 환경 생성)
3. useReducer 적용

## 4. 리덕스(redux, react-redux) 적용하기

### Redux 설정

- redux 및 react-redux를 설치하고 Redux Store 생성.
- 기존의 useReducer를 Redux Reducer로 변환.
- store/index.js에서 Redux Store를 관리.

### 전역 상태 변경

- 기존의 useContext + useReducer 구조를 Redux로 대체.
- useSelector, useDispatch를 활용한 상태 관리

### 컴포넌트 수정

- 기존 useCounter 제거
- Redux Store와 직접 연동

## 5. Redux Thunk 적용 (비동기 상태 관리 도입)

Redux의 기본 동작 방식의 한계를 이해하고 Thunk로 해결

1. 데이터 패치를 어디서 할 것인가?(불편함 느낌)
2. 데이터 패치에 미들웨어 즉, 중간단계가 필요하다.
3. 리덕스 썽크로 구현하기

## 주의 사항

- 본 수업은 count-front, count-api를 기준으로 수업하고 있습니다.