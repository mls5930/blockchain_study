let obj1 = { name: "Alice" };
let obj2 = obj1;  // obj2는 obj1을 "참조" (같은 메모리 주소를 가리킴)

obj1.name = "Bob";  // obj1을 변경하면?
console.log(obj1.name); // "Bob"  (obj2도 변경됨!)
console.log(obj2.name); // "Bob"  (obj2도 변경됨!)
