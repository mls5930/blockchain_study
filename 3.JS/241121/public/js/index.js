// 객체는 자바스크립트를 잘 다루기 위해서 꼭 알아야할 "데이터" 입니다.
// 참조 타입

// 배열 => 변수 하나에 여러 가지 데이터를 담고 싶을 때 사용
// 객체 => 변수 하나에 여러 가지 데이터를 담고 싶을 때 사용

// 학생분들의 이름만 담았죠?
const students = ["김태정", "고혜성", "우혜림", "임채원", "은유정", "전도화", "조상아"];

// 학생분들의 이름과 성별도 함께 구분해서 넣는다면?
// 0: 김태정, 1: 남성, 2: 우혜림, 3: 여성 => 여러 가지 데이터를 담긴 하는데, 두 가지 분류
// 데이터를 넣고 관리하기에는 무리가 있어 보인다.
const students2 = [
    "김태정",
    "남성",
    "우혜림",
    "여성",
    "고혜성",
    "남성",
    "조상아",
    "여성",
    "임채원",
    "여성",
    "여성",
    "전도화",
    "은유정",
    "여성"
]

// 배열 => 학생 전체의 이름만 관리할 때
// 객체 => 학생 한 분의 개인 정보를 관리할 때

// ES5 문법
// 생성자 문법
const allUser = new Array();
// const user = new Object();

// ES6 문법
// 객체 리터럴 문법
// name(키) : "주병현"(값)
// key : value
const teacherInfo = {
    name: "주병현",
    age: 39,
    gender: "남성",
    birthday: "860802-1******",
    "Content-type" : "teacher"    
}
const index = "Content-type"
// console.log(teacherInfo["Content-type"]);
console.log(teacherInfo[index]);

const console1 = {
    log: function(text) { 
        console.log(text);
    }
}

const text = "인자값으로 전달이 될까요?";
// console1.log(text);
console.log('log' in console1); // Boolean: 예, 아니오

