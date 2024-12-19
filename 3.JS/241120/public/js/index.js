// 숫자, 문자, null, undefined, boolean => 원시 타입
// 하나의 변수에 하나의 값 => 원시 타입값만을 할당해 왔었음.
let student1 = "김태정 님";
let student2 = "고혜성 님";
let student3 = "우혜림 님";
let student4 = "임채원 님";
let student5 = "전도화 님";
let student6 = "은유정 님";
let student7 = "조상아 님";
let teacher = "주병현 교강사 님";

// console.log(student1);
// console.log(student2);
// console.log(student3);
// console.log(student4);
// console.log(student5);
// console.log(student6);
// console.log(student7);
// console.log(teacher);

// 비효율적 => 하나의 변수에 강의장 전체를 담자

let allPeople = [
    "김태정 님", 
    "고혜성 님", 
    "우혜림 님", 
    "임채원 님", 
    "전도화 님", 
    "은유정 님", 
    "조상아 님",
    "주병현 교강사 님"
];

console.log(allPeople);

/*
    인덱스(0): "속성값"("김태정 님")

    인덱스 : 배열에서 각 속성값에 접근하기 위해서 사용하는 위치(번호)입니다.
    인덱스는 항상 0부터 시작합니다.

    0: "김태정 님"
    1: "고혜성 님"
    2: "우혜림 님"
    3: "임채원 님"
    4: "전도화 님"
    5: "은유정 님"
    6: "조상아 님"
    7: "주병현 교강사 님"
    length: 8 => 너가 배열에 담은 값이 숫자가 총 몇개야? 길이가 몇개야?
*/