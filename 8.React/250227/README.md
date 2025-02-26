## 리액트 환경 구성

어제 했던것처럼 똑같은 환경

### 관련 패키지 설정

```sh
npm init -y
npm install -D webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react
npm install -D webpack-dev-server html-webpack-plugin babel-loader react react-dom
```

### 웹팩 초기 설정

```js
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: "250226",
    mode: "development",
    entry: "./src/index.jsx",
    resolve: { 
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        })
    ],
    output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
    },
    devServer: {
      static: {
          directory: path.join(__dirname, "dist")
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true
    },
}
```

여기까지 잘 되는지 테스트하기 위해서 디렉토리 구성해봄

### Test 파일 생성

```sh
250227/
├── public/
│   ├── index.html
├── src/
│   ├── app.js
│   ├── index.js
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

**src/app.jsx**

```jsx
import React from "react"

const App = () => {
    return <>Hello World!</>
}

export default App
```

**src/index.jsx**

```jsx
import React from "react";
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App/>)
```

### ReactDOM 역할 이해하기

**webpack**

웹팩을 실행하는 방법은 두 가지가 있음.

```sh
npx webpack
# 어떻게 동작이 이루어지는지

npx webpack server
# 위에랑 두가지 차이점을 아는가

npm run dev
# 이친구는 왜 되는가 ?
```

**package.json**

```json
"scripts":{
    "dev": "webpack server",
}
```

여기서는 왜 npx 가 빠져도 되는지.
알아보면 좋습니다.

**실행**

```sh
npm run dev

> 230303@1.0.0 dev
> webpack server

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:3000/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.163:3000/
<i> [webpack-dev-server] Content not from webpack is served from 'C:\Users\pc-007\Documents\block8\7. React\230303\dist' directory
<i> [webpack-dev-server] 404s will fallback to '/index.html'
[BABEL] Note: The code generator has deoptimised the styling of C:\Users\pc-007\Documents\block8\7. React\230303\node_modules\react-dom\cjs\react-dom.development.js as it exceeds the max of 500KB.
asset bundle.js 1.23 MiB [emitted] (name: main)
asset index.html 378 bytes [emitted]
runtime modules 27.4 KiB 13 modules
modules by path ./node_modules/ 1.13 MiB
  modules by path ./node_modules/webpack-dev-server/client/ 60.9 KiB 12 modules
  modules by path ./node_modules/webpack/hot/*.js 4.62 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/*.js 115 KiB 4 modules
  modules by path ./node_modules/react-dom/ 844 KiB 3 modules
  modules by path ./node_modules/react/ 94.9 KiB 2 modules
  modules by path ./node_modules/scheduler/ 19.5 KiB 2 modules
  ./node_modules/ansi-html-community/index.js 4.58 KiB [built] [code generated]
  ./node_modules/events/events.js 14.3 KiB [built] [code generated]
modules by path ./src/*.jsx 373 bytes
  ./src/index.jsx 216 bytes [built] [code generated]
  ./src/app.jsx 157 bytes [built] [code generated]
styled-components_v1 (webpack 5.75.0) compiled successfully in 7206 ms
```

이러한 명령어가 뜬다면 `http://localhost:3000` 으로 접속해보기.
`Hello world` 가 나온다면 성공적

### Styled-component

Styled-Components 설정하기전에 CSS-loader를 설정하도록 하겠습니다.

- css-loader

style-loader 대신 mini-css-extract-plugin 설치할거임

**관련 패키지 설치**

```sh
npm install -D  mini-css-extract-plugin css-loader
```

webpack 관련 plugin, loader를 설치했으면, `webpack.config.js` 설정파일 수정

**추가된 설정**

`webpack.config.js`

```js
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({ filename: "bundle.css" }),
    ],
```

**실행**

```sh
npm run dev
```

`http://localhost:3000` 접속해보기
