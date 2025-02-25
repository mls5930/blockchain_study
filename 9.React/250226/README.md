## 리액트 프로젝트 구성

### 프로젝트 설치

```sh
npm init -y
npm install @babel/core @babel/cli @babel/preset-env @babel/preset-react
npm install webpack webpack-cli html-webpack-plugin babel-loader
npm install axios express react react-dom
```

### 바벨과 웹팩 설정

**.babelrc**

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**webpack.config.js**

```js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    name: "counter",
    mode: "development",
    entry: "./src/index.jsx",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
}
```

### mode: "development"?

## package.json 초기 설정

```json
{
  "name": "250226",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "npx webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@babel/cli": "^7.26.4",
    "@babel/core": "^7.26.9",
    "@babel/preset-env": "^7.26.9",
    "@babel/preset-react": "^7.26.3",
    "axios": "^1.7.9",
    "babel-loader": "^9.2.1",
    "express": "^4.21.2",
    "html-webpack-plugin": "^5.6.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "webpack": "^5.98.0",
    "webpack-cli": "^6.0.1"
  }
}
```

**src/app.js 컴포넌트**

컴포넌트를 모아주는데

src/app.js

```jsx
import React from "react";

const App = () => {
    return (
        <div>하하하</div>
    )
}

export default App
```

**src/index.jsx 파일 내보내기**

entry 포인트

index.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.jsx";

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App/>)
```

### 확장자명 변경 (js => jsx`)

js에서 jsx로 확장자 파일명 변경

## 질문

- export와 export default의 차이점
- index.jsx 왜 index.js가 아님?
- 왜 webpack.config.js에는 require문 사용함?
- 왜 import App from "./app.jsx"; 맨 뒤에 jsx를 붙혀야 함?

## 이슈

19버전 설치했을 때 나타나는 이슈

```sh
index.jsx:9 Uncaught TypeError: react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot is not a function
    at eval (index.jsx:9:51)
    at ./src/index.jsx (bundle.js:69:1)
    at __webpack_require__ (bundle.js:93:41)
    at bundle.js:157:37
    at bundle.js:159:12
```

# 여러 컴포넌트 찍어볼거임

## 프로젝트 폴더 구조

```
/250226
│── /dist            # 번들링된 정적 파일 저장
│── /src             # 프론트엔드 소스 코드
│    ├── index.jsx
│    ├── App.jsx
│    ├── pages/
│── /serve           # 백엔드 서버 파일 (선택적)
│    ├── server.js
│── package.json
│── webpack.config.js
```

pages에 컴포넌트 파일들 다 모을거임.

- pages 디렉토리 폴더 : 

## 카운터 찍기

**./pages/Counter.jsx**

```jsx
import React, { useState } from "react";

export const Counter = () => {
    const [value, setValue] = useState(0)
    return (
        <>
            <div>{value}</div>
            <button>+</button>
            <button>-</button>
        </>
    )
}
```

## 이슈

```sh
index.jsx:9 Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
```

원인:
React 18부터 createRoot는 react-dom이 아니라 react-dom/client에서 가져와야 합니다. 기존의 react-dom에서 createRoot를 가져오면 위와 같은 경고가 발생합니다.

**./pages/Counter.jsx**

```jsx
import React, { useState } from "react";

export const Counter = () => {
    const [value, setValue] = useState(0)

    const increment = () => {}
    const decrement = () => {}
    return (
        <>
            <div>{value}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}
```

그 다음

```jsx
import React, { useState } from "react";

export const Counter = () => {
    console.log(document);
    
    const [value, setValue] = useState(0)

    const increment = () => {
        setValue((prevState) => prevState + 1);
    }

    const decrement = () => {
        setValue((prevState) => prevState - 1);
    }
    return (
        <>
            <div>{value}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}
```

결과 나옴

## 근데 이대로 계속 npx webpack해서 번들링할거야??

번거롭지 않아? 적어도 개발할때는 좀....편하게 개발해야지

## Webpack Hot reloading

### 패키지 설치

```sh
npm install webpack-dev-server
```

### webpack.config.js 

```js
module.exports = {
    ...
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
}
```

속성 설명
- static: {
    directory: path.join(__dirname, "dist"),
},
- compress: true
- historyApiFallback: true

웹팩에서 서버 설정했으면, 서버가 필요하겠지?

**./serve/server.js**

```js
const express = require("express")
const app = express()
const path = require("path")

// localhost:3000/bundle.js
app.use(express.static(path.join(__dirname, "..", "dist")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist/index.html"))
})

app.listen(3000, () => {
    console.log(`front server`)
})
```

Webpack Dev Server를 실행하면 코드 변경 시 자동으로 브라우저가 업데이트됨

### **`package.json` 수정**

```json
"scripts": {
    "start": "webpack serve --open --hot",
    "build": "webpack"
}
```

### webpack Dev Server 즉 Hot reloading 작동 흐름



### 함수형 컴포넌트

함수형 컴포넌트

`생명주기 함수`

리액트 런타임 환경 함수형으로 다시 작성

### 함수형 컴포넌트 상태

### 함수형 컴포넌트 생명주기 함수

## 로그인

## 개사진 갤러리

