// reduce 배열 메서드
// 1. 배열의 모든 요소를 "순회"하며 누적값을 계산하는 방식

// 배열안에 숫자들의 합 계산
const numbers = [1, 2, 3, 4, 5];
// let sum = 0
// for(let i = 0; i < numbers.length; i++) {
//     sum = sum + numbers[i];
// }

// console.log(sum);

// acc: 누적값
// curr: 현재값
// 0: acc(누적값)의 초기값
const sum = numbers.reduce((acc, curr) => {
    // console.log(`acc: ${acc}, curr: ${curr}`);
    return acc + curr;
}, 0)
/*
    acc: 0, curr: 1
    acc: 1, curr: 2
    acc: 3, curr: 3
    acc: 6, curr: 4
    acc: 10, curr: 5
*/

// 2. 데이터 타입 구조를 변경할 때 사용

/*
    우리가 구현하려는 목표
    배열안에 과일의 갯수를 파악하는 객체

    배열
    ['apple', 'banana', 'orange']

    =>

    객체
    {
        apple: 1,
        banana: 1,
        orange: 1
    }
*/

// const object = {}
// // object.apple = 1;
// object["apple"] = 1;
// console.log(object);
// {apple : 1}


const fruit = ['apple', 'banana', 'orange', "banana"];
const fruitCount = fruit.reduce((acc, fruit) => {
    // acc => {}
    // "apple"
    // acc["apple"] = 1;
    // acc["banana"] = 1;
    // acc["orange"] = 1;
    // 기존의 과일이 있다면 그 과일의 갯수 + 1
    // 없으면 0 + 1
    /*
        {
           apple: 1,
           banana: 2,
           orange: 1
        }
    */
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {})
// { apple: 1, banana: 2, orange: 1 }
console.log(fruitCount);

// 이제, 다음 쿠키값을 객체로 변환시키자

/*
    "user_id=wnqudgus1234"

    {
        user_id : "wnqudgus1234"
    }
*/

// 쿠키값으로 가정한 값
const cookieString = "user_id=wnqiudgus1234"

// array.map() 메서드는 배열의 각 요소에 대해서 주어진 함수를 실행
// 새로운 배열로 반환

const one = cookieString.split(";");
// one => [ 'user_id=wnqiudgus1234' ]
const two = one.map((cookie) => cookie.split("="))
// two => [['userid','wnqudgus1234']]

// 1. reduce는 "순회"함.
// 2. 그래서 익명 콜백 함수로 매개변수 받을 때, 배열이 한 번 벗겨짐 
// => ["user_id", "wnqudgus1234"]
// acc => {}, key => "user_id", value => "wnqudgus1234"
const three = two.reduce((acc, [key, value]) => {
    // acc["user_id"] = "wnqudgus1234"
    acc[key] = value
    // { user_id = "wnqudgus1234"}
    return acc
}, {})
console.log(three);

const user = [
    {
        user_id: "wnqudgus1234"
    }
]
// [{}] => {}
user.find((value) => console.log(value))



