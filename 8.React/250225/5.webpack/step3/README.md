## 개요

Webpack을 사용하여 **HTML 템플릿을 자동 생성, 리액트 프로젝트를 설정하는 방법**

## Webpack plugin

Webpack은 기본적으로 자스 파일을 번들링만 함. 그래서 HTML파일을 생성하지 않음
=> CSS도 마찬가지임!!
=> 개념으로 보면, 웹팩은 자스만 번들링하고 css도 번들링 필요하면 그 외 모듈 설치 필요
=> css-loader, style-loader
이 문제를 해결하기 위해서 `html-webpack-plugin` 을 사용하면 자동 html 생성

## Webpack을 사용하여 HTML 파일 생성

### 1. 관련 패키지 설치

```sh
$ npm init -y
$ npm install webpack webpack-cli html-webpack-plugin
```

### 2. 프로젝트 폴더 구조

```
/step3
│── /src
│   ├── index.js
│   ├── index.html
│── /dist
│── package.json
│── webpack.config.js
```

### 3. Webpack 설정 파일 (`webpack.config.js`) 작성

```js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 모든 .js 파일에 대해
                exclude: /node_modules/,
                use: ["babel-loader"] // 바벨 적용
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    }
}
```


**설정 설명**

- **`entry`**: Webpack이 번들링을 시작할 JavaScript 파일 (`index.js`).
- **`output`**: 번들링된 파일(`bundle.js`)을 `dist` 폴더에 저장.
- **`plugins`**:
  - `HtmlWebpackPlugin`: `src/index.html`을 템플릿으로 사용하여 자동으로 HTML 파일 생성.
  - HTML 파일 내부에 Webpack이 생성한 `bundle.js`가 자동으로 포함됨.

## 리액트 프로젝트 디렉토리 구성

### 1. React 관련 패키지 설치

```sh
$ npm install react react-dom
```

### 2. Babel 설정 추가

React의 JSX 문법을 사용하려면 **Babel을 설정하여 JSX를 변환해야 함.**

#### **`.babelrc` 생성**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**설정 설명**

- **`@babel/preset-env`**: 최신 JavaScript 문법(ES6+)을 변환.
- **`@babel/preset-react`**: JSX 문법을 변환하여 브라우저에서 실행 가능하도록 함.

#### **관련 패키지 설치**

```sh
$ npm install @babel/preset-env @babel/preset-react
$ npm install @babel/core babel-loader
```

설치된 패키지:

- `@babel/core` → Babel의 핵심 기능.
- `babel-loader` → Webpack에서 Babel을 사용할 수 있도록 도와주는 Loader.

JSX => js파일만 덩그러니
=> 웹팩이 끌어다 가져와서 bundle에 추가하는거야. => babel-loader

```js
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 모든 .js 파일에 대해
                exclude: /node_modules/,
                use: ["babel-loader"] // 바벨 적용
            }
        ]
    },
```

