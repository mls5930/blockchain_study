## 개요

Wepback의 `Loaders`는 다양한 유형의 파일을 Javascript 모듈처럼 사용할 수 있도록 도와줌.  
이 예제에서는 CSS 파일을 Webpack을 통해 번들링하는 방법을 알아보겠슴.  

## Loaders 역할

- Javascript 외에도 **CSS, 이미지, 폰트, HTML 파일 등 다양한 유형의 파일을 웹펙에서 처리** 할 수
있도록 지원함.
- 웹팩은 기본적으로 자스만 번들링 가능하게끔 만듦 => CSS, 이미지등은 별도의 Loader가 필요하다.

### CSS Loader와 style Loader

- CSS Loader: Css파일을 자스에서 `import` 할 수 있도록 변환
- style Loader: 변환된 CSS를 `<style>`태그로 브라우저에 삽입

## 웹팩을 사용해서 CSS 파일 번들링하기

### 1. 관련 패키지 설치

```sh
npm init -y
npm install webpack webpack-cli css-loader style-loader
```

설치된 패키지:

- `webpack` → Webpack의 핵심 번들러
- `webpack-cli` → Webpack을 CLI에서 실행할 수 있도록 지원
- `css-loader` → CSS 파일을 JavaScript 모듈로 변환
- `style-loader` → 변환된 CSS를 `<style>` 태그로 삽입하여 브라우저에서 적용

### 2. 프로젝트 폴더 구조

```
step2
│── /src
│   ├── index.js
│   ├── index.css
│── /dist
│── package.json
│── webpack.config.js
```

### 3. webpack 설정 파일 (`webpack.config.js`) 설정

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/, // 모든 .css 파일에 대해
        use: ['style-loader', 'css-loader'], // style-loader와 css-loader를 적용
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
};
```

설정 설명

- `module.rules`에서 CSS 파일(.css 찾음)을 처리할 수 있도록 css-loader랑 style-loader를 적용
- css파일이 자스 코드에서 import될 수 있도록 변환했다.


## 결론

**Webpack의 Loaders를 사용하면 CSS 파일을 JavaScript에서 `import`하여 번들링할 수 있다.**  
**`css-loader`는 CSS를 모듈로 변환하고, `style-loader`는 이를 `<style>` 태그로 삽입하여 브라우저에서 스타일을 적용한다.**  
**Webpack을 활용하면 CSS뿐만 아니라, 이미지, 폰트 등 다양한 파일도 번들링하여 관리할 수 있다.**
