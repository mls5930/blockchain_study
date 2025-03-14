## 개요

아까는 문법 기준으로 변환하는 거였음.  
모듈 시스템

- CommonJS require, module.exports
- ES module export, import

즉, ES6모듈을 ES5모듈로 변환을 해야함.  
=> babel을 사용하여 import를 require로 변환 => 이번 설명에서 다룰 내용

## babel 설정

```sh
npm install @babel/core @babel/cli
npm install @babel/plugin-transform-modules-commonjs
```

@babel/plugin-transform-modules-commonjs: ES6 `import/export`를 CommonJS(`require/module.export`)로 변환

## `.babelrc` 설정

```json
{
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
```

- Babel이 **ES6 모듈을 CommonJS로 변환하도록 설정**함.

## express 서버 파일(`server.js`) 만들기

```js
// const express = require('express')
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Babel With Express!')
})

app.listen(3000, () => {
    console.log("Server is running");
})
```

## Babel 실행하여 변환된 파일 생성

```sh
npx babel server.js --out-file dist/server.js
```