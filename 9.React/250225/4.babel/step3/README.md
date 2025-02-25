## 바벨을 통해 JSX 문법 트랜스파일링

React에서는 JSX(Javscript XML(HTML) 확장 문법)사용.  
브라우저는 JS 해석  
=> 브라우저가 해석할 수 있게끔 변환

## 예제 코드

```jsx
const element = <h1>Hello! JSX!</h1>
```

위의 코드를 Babel을 통해 변환하면

```js
const element = React.createElement("h1", null, "Hello, JSX!");
```

즉, Babel이 JSX를 변환해주지 않으면 React코드는 브라우저에서 실행될 수 없음.

## Babel을 사용하여 JSX를 트랜스파일링하는 과정

```sh
$ npm init -y
$ npm install @babel/core @babel/cli @babel/preset-react
```

- `@babel/core` → Babel의 핵심 기능
- `@babel/cli` → Babel을 터미널에서 실행하는 CLI 도구
- `@babel/preset-react` → JSX 문법을 변환하는 프리셋

## JSX문법을 포함한 즉, 변환시킬 app.js 파일 작성

```js
// 리액트 설치할거임 그리고 가져올거임
const React = require("react");
const ReactDOM = require("react-dom");

class App extends React.Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="#">menu1</a>
                </li>
            </ul>
        )
    }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />)
```

## Babel 실행하여 JSX 트랜스파일링

```sh
$ npx babel app.js --out-file dist/app.js
```

## Babel을 적용했지만, 왜 실행되지 않을까?

기존 Node.js때는 모듈 시스템을 해결할 필요가 없었음.
Node.js 환경에서는 서버가 JavaScript 코드를 실행하고, HTML을 생성해서 브라우저에 전달하기 때문에 브라우저가 JavaScript 모듈 시스템(require나 import)을 직접 해석할 필요가 없었음.

즉, 서버에서 코드 실행

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.render("index.html")
})
```

결과를(HTML)을 브라우저에 전달
Node.js는 V8 엔진을 사용하여 JavaScript를 실행하므로 require()나 import를 직접 처리할 수 있었음.
=> 브라우저는 단지 HTML과 함께 전달된 Javascript를 실행할 뿐, 모듈 직접 해석할 이유가 없었음.

## 근데 지금은? 프론트엔드(브라우저)에서는?

1. Babel은 JSX(React 문법)를 변환해주지만, 모듈 시스템(import/export)은 그대로 남아있음.
2. 브라우저는 import React from "react"; 같은 모듈 시스템을 이해하지 못해서 실행할 수 없음.
3. Webpack은 이 모듈 시스템을 해결해서, 브라우저에서 실행할 수 있도록 모든 코드를 하나의 번들 파일(bundle.js)로 만들어줌.

즉, Webpack은 import, require 같은 모듈 시스템을 변환하여 브라우저에서 정상적으로 실행될 수 있도록 해준다!

➡ 이제 Webpack을 설정해서 React 코드가 정상적으로 실행되도록 해보자!
