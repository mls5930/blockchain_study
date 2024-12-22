// process는 node.js에서 제공하는 내장 객체로,
// 현재 실행중인 프로세스와 관련된 정보와 기능을 제공한다.

// console.log(process.pid); // 현재 프로세스 ID
// console.log(process.version); // Node.js 버전
// console.log(process.uptime() , "초"); // 프로세스 실행 시간

// KEY 
// 우리가 어떤 외부 라이브러리를 사용할 때, 결제해야 하는 것도 있습니다.
// 그럴 때, 그 서비스를 만든 사람은 사용하는 사람이 결제를 했는가 안했는가를 파악해야 합니다.
console.log(process.env.NODE_ENV === "test"); // 환경 변수 리눅스의 echo $PATH와 같다.