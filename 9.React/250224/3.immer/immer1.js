let a = 10;
let b = a;  // b에 a의 값을 복사

a = 20;  // a를 변경해도 b는 그대로
console.log(a); // 20
console.log(b); // 10  (b는 영향을 받지 않음)