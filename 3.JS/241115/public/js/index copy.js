// ES5 변수 문법
// 예약어 [var,let,const] [변수명] = [데이터]
var a = 5 + 5;

/*
    5 + 5 = 10
    => =을 기준으로 설명하자면, 오른쪽 연산을 끝낸 값을 왼쪽에 저장한다 => 할당한다.
*/

// 값을 할당했다면 출력할 수도 있어야 하는데
// 내가 넣은 변수의 값을 확인하는 행위
console.log(a);

var a = 20;

// 자바스크립트의 동적 특성
// 코드가 실행되었을 때, 해당 변수의 데이터 타입이 결정된다.
var a = "문자열도 넣을 수 있다"

console.log(a)

var b = 20;
var a = 20;
var c = b + a;
console.log(a == b); // => 예(true), 아니오(false) => boolean형

// null => 아예 존재하지 않음
// => 개발자가 명시적으로 값이 없다.는 의도를 전달하기 위해 => let g = null
// undefined => 변수를 찾을 수 없음, 변수의 값을 찾을 수 없을 때
// => 변수가 선언되었지만, 값이 할당되지 않았을 때 => let g;

console.log(null == undefined);
console.log("" == 0);
var d = 10 + "10"; // 20이 나올 것 같았거든요.
console.log(d);

var f = null;
// 자바스크립트는 되게 지 맘대로인 애다. => 유동성이 좋다. => 예측할 수 없다.
// 그래서 많은 개발자들은 "엄격한 비교"를 사용해서 예상치 못한 오류를 줄이려고 한다.
console.log(null === undefined);
console.log("" === 0);

// ES5 => ES6
// let, const

let s = 10;
s = 10;
console.log(s);
// 재선언은 불가능, 재할당은 가능 => 다시 값을 할당하는 것.

// 상수
// 최초의 선언만 가능. 재선언 불가능, 재할당 불가능
const l = 20;
// l = 30;
console.log(l);

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
