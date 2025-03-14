## 오늘은 뭐할까?

### 3월 7일(금요일) 월별 평가

- DB(+버튼 누르고 DB에 값 저장하고, 응답 받고, 상태에 넣고, 리렌더링 시키고)
- Sequelize 선택사항 할지 안할지(MySQL로만 갈지) 고민해보겠음
- useContext(선택사항)
- useReducer(선택사항)

### 선택사항이 많은 이유?

핵심 기준은 3가지에요

- 데이터의 흐름을 명확히 파악하고 있는가?(state, props....)
- 리액트 런타임 환경
- 리액트 생명주기

위의 3가지.  
위의 3가지를 명확히 알고 있다면 카운터 구현은 그냥 껌.  
그래서 뭐 useContext든...useReducer든...앞으로 배울 use `Hook` 들은  
전부 위의 기준이 되는 기본기가 탄탄해야만 의미가 있습니다.  
그래서 기본기를 봅니다.

### 자 그래서 오늘 수업은

월별 평가에 필요한 초기 세팅
=> 프로젝트를 할거잖아. 그럼 DB도 다시 봐야됌
=> DB도 다시 살짝 볼겸, 초기 세팅 어떻게 하는지까지 감 잡기

### 리액트 프로젝트 설치

```sh
npx create-react-app counter
```

### 디렉토리 구조


```sh
counter
├─ node_modules
├─ README.md
├─ package-lock.json
├─ package.json
└─ src
   ├─ App.css
   ├─ App.jsx
   ├─ App.test.js
   ├─ index.css
   ├─ index.js
   ├─ logo.svg
   ├─ pages
   │  └─ Counter.jsx
   │  └─ index.jsx
   ├─ reportWebVitals.js
   ├─ setupTests.js
```

### 1. objectState로...