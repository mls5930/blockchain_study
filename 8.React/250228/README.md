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

## 중요한 디렉토리 구조

```sh
nurug
├─ src
│   ├─ components
│   ├─ layouts
│   ├─ pages
│   └─ hooks
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

1. home
2. about
3. contact
4. login

## react-router-dom

```sh
npm install react-router-dom
```

## 핵심

전역 상태가 왜 필요한가?에 대한 간접적인 체험

## index.css

```css
* {
    margin: 0;
    padding: 0;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}
```

App.css 삭제

