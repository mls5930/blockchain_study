# 리액트 프레임워크 환경 설정

```sh
npx create-react-app nurug
```

nurug 부분은 프로젝트 이름이라고 봐도 됨

## 디렉토리 구조

```sh
nurug
├─ node_modules
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
│   ├─ App.css
│   ├─ App.js
│   ├─ App.test.js
│   ├─ index.css
│   ├─ index.js
│   ├─ logo.svg
│   ├─ reportWebVitals.js
│   └─ setupTests.js
├─ package-lock.json
├─ package.json
└─ README_md
```

와우 손나 많음  
리액트의 대표적인 프레임워크.

`CRA` <-- webpack & babel 이 설치 및 설정되어있음.


### src/App.jsx

```jsx
function App() {
  return (
    <div className="App">
      나는 App 컴포넌트
    </div>
  );
}

export default App;
```

## styled-components  설치

CSS는 CSS-in-JS인 스타일드 컴포넌츠 설치

```sh
cd [프로젝트명]
npm install styled-components
```

CSS 

styled-components 

```css
* {
    margin:0;
    padding:0;
}

ul ,li {
    list-style:none;
}
```

에 대한 내용을 `index.css` 내용을 고쳐서 사용함.

## 디렉토리 구조 설명

- components: 조그마한 컴포넌트에 대한 내용을 만듦
=> button, input, checkbox, radiobox
- hooks: 커스텀 훅
- layouts: header, footer, siderbar...
- pages: 메인, 과정소개

## Header 컴포넌트 만들거임

```sh
nurug
├─ src
│   ├─ components
│   ├─ layouts
│   ├─ pages
│   └─ hooks
```

### header는 어디 디렉토리에?

누룩으로 봅시다.  
헤더에 뭘 넣을지 구상은 해봄?  

혜성님한테 물어봄  
헤더에 뭘 넣으면 좋을 것 같아?

레이아웃

큼지큼지막한 것들 생각

- header
- body
- footer
- sidebar

등등

### layout/header

```jsx
import React from "react";

export const Header = () => {
    return (
        <div>나는 헤더</div>
    )
}
```

### src/App.jsx

```jsx
import { Header } from "./layout/Header"

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
```

## 헤더 디자인 요소 설계

뭐가 보여야 할까?

- 로고
- 네비게이션
    - Home(Main)
    - About
    - contact

일단 `감싸야` 할 것이 필요.

`Wrapper`

components/header 만들게요

### components/header/headerWrapper.jsx

```jsx
import styled from "styled-components"

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #333;
    color: #fff;
`
```

어디에 적용시켜야 할까?

layout/header

### layout/header/Header.jsx

```jsx
import React from "react";
import { HeaderWrapper } from "../components/header/HeaderWrapper.styled"

export const Header = () => {
    return (
        <HeaderWrapper>
            나는 헤더!
        </HeaderWrapper>
    )
}
```

컴포넌트들 만들어서 각 `페이지` 들을 구성할거임!

1. / => **pages/Home.jsx**
2. /about => **pages/About.jsx**
3. /contact => **pages/Contact.jsx**

적어도 컴포넌트 3개는 필요하네?

컴포넌트 만들기전에, 링크부터 구성하자

### layout/Header.jsx

```jsx
import React from "react";
import { HeaderWrapper } from "../components/header/HeaderWrapper.styled"
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <HeaderWrapper>
            <ul>
                <li>
                    <NavLink href="/"></NavLink>
                </li>
                <li>
                    <NavLink href="/about"></NavLink>
                </li>
                <li>
                    <NavLink href="/contact"></NavLink>
                </li>
            </ul>
        </HeaderWrapper>
    )
}
```

### NavLink?

이건 무엇인가
왜 a태그 안사용함?

### pages에 페이지에 링크 때리면 나올 컴포넌트들 각각 만들자

## react-router-dom

```sh
npm install react-router-dom
```

## App.jsx

```jsx
import { Header } from "./layout/Header"

function App() {
  return (
    <div className="App">
      {/* Header 에 관련된 Routes */}
      {/* Content 에 관련된 Routes */}
      {/* Footer 에 관련된 Routes */}
    </div>
  );
}

export default App;
```

라우터로 감쌉니다.


```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
```

- BrowserRouter: 
- Routes: 
- Route: 

헤더만 적용해보자

```jsx
import { Header } from "./layout/Header"
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter className="App">
      
      {/* Header 에 관련된 Routes */}
      <Routes>
        <Route path="*" element={<Header/>}/>
      </Routes>
      {/* Content 에 관련된 Routes */}
      {/* Footer 에 관련된 Routes */}
    </BrowserRouter>
  );
}

export default App;
```

- path: URL 경로로 GET(땅) 요청했을 때
- element: 해당 엘리먼트(컴포넌트)가 나와라!

## Content에 관련된 라우트 설정

### / (Home)

```jsx
function App() {
  return (
    <BrowserRouter className="App">
      
      {/* Header 에 관련된 Routes */}
      <Routes>
        <Route path="*" element={<Header/>}/>
      </Routes>
      {/* Content 에 관련된 Routes */}
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      {/* Footer 에 관련된 Routes */}
    </BrowserRouter>
  );
}

```

### /about

```jsx
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />} />
    </Routes>
```

GET /about 한 번 요청 때려보자

## 핵심

전역 상태가 왜 필요한가?에 대한 간접적인 체험

## index.css
