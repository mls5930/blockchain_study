카운트

1. 페이지는 2개 page1 , page2
2. 상태변수는 하나 이나 리듀스를 사용해볼생각이다. count
3. 각 페이지별로는 더하기 함수 하나와 뺼샘 함수 하나씩을 사용한다
4. header로 인한 navigate 를 사용하여 페이지를 띄울 예정이다. react dom 필요
5. 함수 2개는 hooks 으로 뺴서 사용해볼 예정이다. 곱하기 함수 , 나누기 함수
6. css는 porps로 내려줘서 사용할 예정이다 styled components
7. 버튼은 버튼 컴포넌트를 따로 만들어서 가져올 예정이다.

구현순서

1. html 뼈대
2. 내부적인 컴포넌트 상태
3. hooks
4. 리액트 라우트 돔
5. 전역 상태

공부 목록

리듀서 "상태를 바꾸는 규칙"

기존상태를 업데이트 하여 새로운 상태를 만들어줌 상태는 항상 이전 상태를 기준으로 업데이트

1. 기존상태 명시

2. 기존상태를 switch 문 등으로 업데이트 인자로는 상태와 action 을 받는다.

3. 상태를 업데이트 하고 적용

### 리덕스

**컴포넌트 끼리 너뭄 많은 props 전달이 있고 상태 공유가 필요할때**
"앱 전체 상태를 저장하고 관리하는 중앙창고"

- provider - 리덕스 전역 상태를 리액트에 공급해주는 컴포넌트

```jsx
function App() {
  import { Provider } from "react-redux"; // 가져와야함
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}
```

- useDispatch - 액션을 보내는 함수

```jsx
const dispatch = useDispatch();

// 예시: 카운트를 1 증가
dispatch({ type: "INCREMENT" });
```

- useSelector - 리덕스 상태를 꺼내오는 함수

```JSX
const count = useSelector((state) => state.count);
```

로그인이나 정보 전역 공유 장바구니 정보 저장 게시판 데이터 글, 작성 상태 등

[1] 버튼 클릭 → [2] 액션 발생 (type: "HEAL", amount: 10)
↓
dispatch(action)
↓
[3] reducer(state, action) 호출
↓
[4] 새로운 상태 생성
↓
[5] UI가 자동으로 새 상태로 업데이트됨

## 타이머 이벤트

지정된 시간마다 반복하는 함수 setinterval

```jsx
setinterval(() => {}, 1000);

clearInterval(timer);
```

### 라우팅

{
항목 Link NavLink

    역할	    단순 라우팅 (이동만 함)	               라우팅 + "현재 위치(active)" 감지 가능
    스타일링    직접 className 줘야 함	               현재 경로일 경우 자동으로 스타일링 가능
    사용 목적	 일반 이동	                           네비게이션 메뉴, 탭 메뉴 등에서 사용

}

### 배열 가져오기

<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>

항목 설명 체크
🧠 JSX 이해 return <div>hello</div> 형식 이해 ⬜️ o
🔁 컴포넌트 만들기 함수형 컴포넌트 만들고 props 넘겨보기 ⬜️ o
⚙️ useState 사용 상태 만들고 버튼으로 값 변경 ⬜️ o
🔄 useEffect 사용 의존성 배열에 따라 동작 확인 ⬜️ o
🧩 Props vs State 구분 부모에서 props 전달 vs 내부 state 관리 구분 ⬜️ o
🧱 컴포넌트 분리 하나의 컴포넌트를 여러 컴포넌트로 쪼개보기 ⬜️ o

🚀 중급 기능 숙련 체크리스트
항목 설명 체크
📦 Context API 사용 전역 데이터 (예: 로그인 여부) 관리해보기 ⬜️ o
📡 API 통신 fetch나 axios로 데이터 가져오기 ⬜️
🔁 배열 렌더링 map으로 반복 출력해보기 ⬜️ o
🧹 useEffect 정리(cleanup) 타이머나 이벤트 리스너 제거 ⬜️
📝 Form 제어 컴포넌트 입력폼에서 상태 업데이트 ⬜️ o
🎣 Custom Hook 만들기 공통된 로직을 커스텀 훅으로 분리 ⬜️ o

🧠 심화 개념 숙련 체크리스트
항목 설명 체크
🧵 useMemo, useCallback 성능 최적화 용도로 사용해보기 ⬜️
🔄 리렌더링 최적화 React.memo, useCallback 등으로 렌더링 방지 ⬜️
💬 컴포넌트 간 통신 흐름 완전 이해 부모-자식, 상태 끌어올리기 등 ⬜️ o
🚦 조건부 렌더링 삼항연산자, AND 연산 등으로 조건 렌더링 ⬜️ o
🔧 에러 핸들링 try-catch, 오류 fallback 등 ⬜️ o

🧰 실전 능력 체크리스트
항목 설명 체크
🧭 React Router 사용 페이지 이동, 동적 라우팅 구현 ⬜️ o
📂 폴더 구조 정리 components, pages, hooks 등 나눠보기 ⬜️ o
🎨 스타일링 도구 사용 styled-components, Tailwind, CSS 모듈 중 하나 ⬜️ o
🗃️ 상태관리 라이브러리 사용 Redux, Zustand, Recoil 등 하나 사용해보기 ⬜️
⚙️ 프로젝트 세팅 Vite, CRA, Next.js 중 하나로 초기 세팅 ⬜️
🧪 테스트 간단한 Jest + React Testing Library 테스트 ⬜️
