
// 모듈

// 프로그램의 작은 단위.
// 하나의 파일에 모든 코드를 작성하면 협업이나 유지보수가 어려움.
// 이를 해결하기 위해서 코드를 분리하여 재사용 가능하도록 함.

// Node.js

// require : 내장 모듈
const {a, out1} = require('./index2');
console.log(a());
console.log(out1);

// 외장 모듈

// 내장 모듈이 지원하지 않는 기능을 다른 사람이 만들어서 인터넷에 업로드해 놓은 모듈(오픈소스)

// express, brew

// 이러한 외장 모듈들을 다운로드 할 수 있게 도와주는게
// Node Package Manager
// node.js를 위한 패키지 매니저.