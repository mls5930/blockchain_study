// ES5 변수 문법

// 예약어 [let,const] 변수명 [아무글자] = [데이터]
// 예약어 var인 변수 a에 10을 할당하겠다.

var a = 10;

/*
    좀 많이 문장이 어려움.

    현실 세계에서의 계산은 어떻게 하더라?

    5 + 5 = 10

    우리가 계산할 때, 5 + 5 = 10이라는 식을 통해 값을 구하듯,
    자바스크립트도 계산된 값을 변수에 넣어서 사용합니다.
*/

// =을 기준으로 설명하자면, 오른쪽 연산을 끝낸 값을 왼쪽에 저장한다라는 말을
// 할당이라고 합니다.
var a = 5 + 5;

// 값을 할당했다면 출력할 수 있어야 하는데
console.log(a);

/*
    값을 출력한다. 또는 값을 호출한다라고 함.
    변수에 어떠한 값이 들어있는지 확인하는 문구
*/
console.log(a);

// 문자열
var b = '자바스크립트에 오신걸 환영합니다.';

console.log(b);
console.log(b);
console.log(b);
console.log(b);

var b = 10;

// false(거짓 => 아니다) => boolean 타입
// true(진실 => 맞다) => boolean 타입
console.log(a == b); // 값을 비교함

var b = '10';

// true
console.log(a == b);

// 값을 비교 => ==
// 데이터 타입까지 비교 => ===
console.log(a === b);
// 검증을 하는 상황이 많이 일어나니 ==은 되도록 사용하지 않습니다.

var c = 10;
var d = 20;
var e = 30;

// undefined => 알 수 없는 값. => 변수의 선언을 찾지 못하거나, 특정 변수의 데이터 값이 어떤 데이터 값인지 모를 때
// null => 없는 값 => 존재하지 않는 값.

// 당연히 false가 나오겠지? => true
console.log(null == undefined);
// true
console.log(false == 0);
// true
console.log('' == 0);
// 위의 값을 통해 자바스크립트는 지 멋대로인 놈인걸 알 수 있습니다.

// => 자바스크립트는 유연한 대신, 때때로 비합리적인 결과를 내기도 한다.
// 그래서 많은 개발자들은 "엄격한 비교"를 사용해서 예상치 못한 오류를 줄이려고 함.

// 또 하나의 불합리한 상황이 놓이는데 바로 다음과 같습니다.
console.log(10 + '10');
// 데이터 형 변환

var anything = 1;
// 재선언
var anything = 2;
// 재선언
anything = 3;

// 그래서 자바스크립트 버전이 ES5에서 => ES6로 업데이트

// ES6 문법

// let, const
let r = 10;
console.log(r);

// 예약어와 함께 사용하여 변수를 선언하는 행위 => 재선언 => 새로운 변수가 선언되는 행위
var a = 5 + 5;
var a = 20;
// let은 재선언 불가하지만 재할당은 가능
// let r = 20;
r = 20;
// const는 초기 선언만 가능. 재선언 불가, 재할당 불가
const k = 0;
k = 1;

// 원시타입
let number = 1; // 숫자
let bool11 = true; // 불리언
let bool22 = false; // 불리언
let null1 = null; // null
let undefined1 = undefined; // undefined
let symbol1 = Symbol(); // symbol
let string2 = '문자열 자료형'; // 문자열

/*
    예약어

    예약어는 자바스크립트가 특정한 기능을 수행하기 위해 미리 정해 둔 단어입니다.
    따라서 변수명으로는 사용할 수 없습니다.
*/

// 변수에 값을 할당 했을 때, 어떻게 메모리가 저장되는지 그려주면 좋을 듯

// 참조타입
let array1 = [];
let function1 = function a() {};
let object1 = {};

// 참조타입의 데이터 저장 방식 그림 그리면 좋을 듯

let firstName; // 카멜표기법
let FirstName; // 파스칼
let first_name; // 스네이크
