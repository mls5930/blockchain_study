
// 예약어 => 내가 쓴 코드 중 하나가 변수인지, 함수인지를 자바스크립트에 알려주는 행동.
// 데이터 타입
// ㄴ 원시 타입
// ㄴ 참조 타입

// 원시타입
let number1 = 1; // 숫자(number)타입
let bool11 = true; // true or false => boolean타입
let null11 = null; // null타입
let undefined11 = undefined; // undefined타입
let string1 = "문자열 자료형"; // string(문자열)타입

/*
    예약어

    자바스크립트가 특정한 역할을 수행하기 위해 미리 정해둔 단어.
    역할 => 변수를 선언하겠다, (function) 함수를 선언하겠다
    예약어를 식별해서 우리가 적은 코드가 변수인지, 함수인지 알려주는 행위
    let number2 = 30; => ES6 변수 선언 문법으로 변수를 선언하고 30을 할당할거야.
*/

// 참조타입 => 배열, 객체, 함수
let array1 = [1, 2, 3]; // 참조 값을 저장한다 => 실제 데이터가 저장된 위치를 가리키는 "주소"
console.log(array1);
let object1 = {};
function a () {}

// 왜 하나의 타입으로 묶지 않고 왜 두 가지로 나뉘었냐?