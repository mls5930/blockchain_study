# 저번 수업은 뭐했을까?

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

## 이번 수업에는 뭐할까?

`Redux-Thunk`

### Redux Thunk 적용 (비동기 상태 관리)

1. 데이터 패치를 어디서 할 것인가?
2. 비동기 로직을 미들웨어로 처리
3. **Redux-Thunk**로 구현하기

### 수업 예제 (count-front, count-api 기준)

1. 디렉토리 구조 변경

    - `store` 폴더 제거 → `reducers` + `store.js`
    - `actions` 폴더 추가: Thunk 액션(`fetchData`, `updateCount`) 관리

2. Thunk 액션 함수 이름 컨벤션

    - `fetchXxx`: 서버에서 데이터 가져오기 (GET)
    - `updateXxx`: 서버에 데이터 갱신하기 (POST/PUT)

3. 컴포넌트에서 비동기 액션 사용

    - `useDispatch()`로 Thunk 액션을 `dispatch(fetchSetData())` 호출
    - `useSelector()`로 Redux 상태 접근

## 주의 사항

- 본 수업은 `count-front`, `count-api`를 기준으로 수업

## 핵심

- Redux로 전역 상태 관리가 끝났으니, **비동기 로직**을 어떻게 깔끔하게 처리할지 **Redux Thunk**로 살펴봄
- 컴포넌트 내부의 비동기 코드를 **Action(Thunk)**로 분리하여 **코드 가독성** 및 **재사용성**이 높아짐