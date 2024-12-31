// 메서드 종류?
// 자바스크립트 안에 내장되어 있는 내장 메서드가 무엇일까?
// console.log()

// const array = [1,2];
// array.findIndex();
// array.find();
// array.map();

// string 메서드

// trim()
let str = " 자바스 크립트 ";
// console.log(str.length);
const trimStr = str.trim(); // 문자열 양 옆의 공백을 없애준다.
// console.log(trimStr.length);

// replace
const replaceStr = str.replace("크립트", "크"); 
/*
    찾고자 하는 값을 a에 문자열로 적고
    바꾸고자 하는값을 b에 문자열로 적어준다
*/

const str4 = {
    trim: function() {
        return ""
    }
}
const str5 = str4.trim()

// split
const x = '1,2,3,4,5,6,7,8,9';
// console.log(x);
const y = x.split(",");
console.log(y);
['1', '2', '3','4', '5', '6','7', '8', '9']

/*
    글자를 나누고 싶을 때 사용하는 메서드.
    문자열을 배열 안에 넣어준다.

    내장 메서드는 키워드 위에 마우스를 올려두면 그 키워드에 대한 설명이 있습니다.
    ,를 기준으로 매개변수의 데이터타입이 무엇인지 파악해야 합니다.
*/