## 개요

`Babel의 등장 배경과 필요성`

Babel의 기본 개념과 설정 과정을 잘 알아야 한다.
그래서, 바벨 또한 기본 소양이 있음 => 기본적인 배경 지식과 역사
여기에 역사적 배경과 추가적인 깊이 있는 설명을 더하면, Babel이 왜 중요한지 더 명확히 이해할 수 있음.

### JavaScript는 꾸준히 진화하지만, 브라우저는 바로 지원하지 않는다

- ES6(ECMAScript 2015) 이후 JavaScript는 빠르게 발전하고 있음.
- 하지만 구형 브라우저(예: Internet Explorer)는 최신 문법을 바로 지원하지 않음.
- 따라서, **새로운 JavaScript 문법을 구형 브라우저에서도 사용할 수 있도록 변환하는 도구**가 필요함.  
  → **Babel이 이 역할을 함!**

### JavaScript 실행 환경의 다양성

JavaScript는 실행되는 환경이 다양함:

- **브라우저 환경 (window 객체 사용)**
- **Node.js 환경 (global 객체, require 사용)**
- JavaScript 실행 환경마다 **지원하는 문법이 다름** → 변환이 필요함.

예제: ES6의 `import/export` vs. CommonJS의 `require/module.exports`

```js
// ES6 모듈 시스템 (import/export)
import { sum } from './math.js';

// CommonJS 모듈 시스템 (require/module.exports)
const sum = require('./math.js');
```

Babel은 ES6 문법(`import`)을 구형 환경(Node.js 또는 구형 브라우저)에서 사용할 수 있도록 `require`로 변환해줌.

---

## Babel의 핵심 역할

1. ES6+ 문법을 ES5 이하로 변환 (브라우저 호환성 확보)
2. `import/export` 같은 모듈 시스템을 `require/module.exports`로 변환
3. 최신 JavaScript 기능(예: async/await)을 구형 브라우저에서도 사용할 수 있도록 지원

---

## Babel의 기본 사용법 정리

### Babel 설치

```sh
$ npm init -y
$ npm install @babel/core @babel/cli @babel/preset-env
```

- @babel/core: Babel 핵심(Core) 패키지, Babel의 변환 기능을 수행하는 메인 엔진 역할
- @babel/cli: 바벨을 터미널에서 실행할 수 있도록 해주는 CLI
- @babel/preset-env: 최신 Javascript 문법을 자동으로 변환해주는 프리셋

### `.babelrc` 파일 생성 (Babel 설정)

babel`rc` => babel 실행 시 적용할 설정을 담고 있는 `런타임 설정 파일`

```json
{
  "presets": ["@babel/preset-env"]
}
```

- `@babel/preset-env`는 **최신 JavaScript를 변환할 때 가장 중요한 설정**  
  → **현재 실행 환경(브라우저, Node.js 등)에 맞춰 자동으로 변환해줌.**

### Babel 실행

```sh
npx babel example.js --out-file dist/example.js
```

- `example.js` 파일을 Babel을 사용해 변환하고, `dist/example.js`로 저장.

---

## 결론: Babel을 통해 얻을 수 있는 것

1. 최신 JavaScript 문법을 구형 브라우저에서도 사용할 수 있도록 변환
2. 모듈 시스템(ES6 import/export → require) 변환 가능
3. Node.js와 브라우저 환경 차이를 해결할 수 있음
4. JavaScript 런타임이 동작하는 방식을 더 깊이 이해할 수 있음

## 핵심!

Babel은 단순한 트랜스파일러가 아니라,  
JavaScript의 발전 과정과 실행 환경을 배우는 도구이기도 하다!
