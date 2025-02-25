## 개요

`Webpack 기본 실행 과정 정리`

- webpack은 **여러 개의 Javascript 파일을 하나로 번들링하고, 최적화하여 배포할 수 있도록 도와주는 도구**
- CommonJS(`require`) 또는 ES6 모듈(`import/export`) 즉 모듈 시스템을 자동으로 처리하고 실행 가능하게 만듦.  

## 배경과 역사

### 초기 웹 개발 방식 (1990~2000년대 초반)

1. Javascript, CSS, HTML이 철저하게 분리되었어요 (웹 1.0 시대)

그래서 모든 요청을 서버가 다 직접 독립적인 파일로 관리 및 직접 처리

- **HTML**: 페이지의 구조를 담당
- **CSS**: 스타일을 담당
- **JavaScript**: 동적 기능을 담당

문제점 발생

1. 파일 요청이 많아진다. => HTTP 요청이 증가 => 웹 페이지는 로딩 속도가 현저히 느려짐
2. CSS, Javascript가 파일 단위로 관리되면서 의존성 증가.
3. CSS, 자스, HTML 하나의 파일로 관리
=> 자스 파일 많아지면, 파일 순서도 다 지켜줘야겠죠?
등등....

즉, 규모가 커질수록 파일 관리 힘듦, 성능 최적화가 필요함.

2. 모듈 시스템과 자스 패키지 매니저 등장

- AMD (2010년)
- CommonJS (Node.js에서 사용)

한계점 발생

- 브라우저에서는 여전히 자스 파일을 따로 로드해야 함. => HTTP 요청이 많아짐
- 자스는 모듈화되었는데, CSS랑 HTML은 여전히 하나의 파일로 관리

3. 프론트엔드 `프레임워크` 와 SPA 등장 (2010년대 초반)

React, Angular, Vue.js 등등 프레임워크 등장

### 프레임워크요? 그게 뭔데요?

개발할 때, 필요한 기본 구조와 규칙을 제공하는 틀(Template)이에요.
=> **페이지 단위 개발 방식에서 컴포넌트 기반 개발 방식**으로 전환

```jsx
const Button = () => {
    return <button>Click Me</button>
}

export Button
```

문제가 발생했다더라

- HTML, CSS, Javascript가 컴포넌트 단위로 결합되면서, 파일을 따로 관리하는 것이 비효율적이 됨.
- CSS는?? CSS는 모듈 안돼요?

오까이! CSS도 자스처럼 모듈화 필요성 있어 납득이 돼!
얘도 같이 번들링 진행시켜

뭘로?  

### Webpack 등장 (2014년)

CSS도 모듈처럼 불러오는게 가능!

```js
import './style.css'
```

### 그래서 웹팩 어떻게 해요?

그래서 이제부터, step1, 2, 3로 나뉘어서 바벨 + 웹팩 수업을 진행할거에요.

### 웹팩 기본 실행 과정

1. 관련 패키지 설치

```sh
$ npm init -y
$ npm install webpack webpack-cli
```

설치된 패키지 설명

- webpack => 핵심 번들링 기능
- webpack-cli => 웹팩을 터미널(CLI)에서 실행할 수 있도록 지원

### 2. 프로젝트 구성

```
/step1
│── /src
│   ├── index.js
│   ├── /pages
│   │   ├── home.js
│── /dist
│── package.json
│── webpack.config.js
```

- `src/index.js`: webpack의 진입점(entry)
- `src/pages/home.js`: 모듈화된 파일.
- `dist/bundle.js`: webpack이 최종적으로 생성할 번들 파일

### 3. Webpack 설정 파일 (`webpack.config.js`)

`npx webpack` 땅 때리면, 뭐부터 확인해?

webpack.config.js 설정 파일 확인

- `entry` : 번들링이 시작될 진입점(메인 파일)
- `output` : 번들링된 파일이 저장된 위치 및 파일명