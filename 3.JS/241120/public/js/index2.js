// 배열은 데이터를 "순서"대로 저장합니다.
// array = arr
const arr = ["주병현", "이순현"];

// arr의 주병현이라고 써져있는 값을 출력하고 싶다?
// console.log(arr[0]);
// arr의 이순현이라고 써져있는 값을 출력하고 싶다?
// console.log(arr[1]);

// 배열의 0번째 인덱스 값과 1번째 인덱스 값을 더해볼 수 있을까요?
console.log(arr[0] + " " + arr[1]);

// 배열의 총 길이를 구할 수 있냐?
// console.log(arr.length);

let arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(arr2.length);

// arr2의 값들을 전부 "하나하나씩" 출력해보세요

// 배열을 할당한 변수 arr2를 0번째 인덱스부터 9번째 인덱스까지 값을 출력해보세요
for(let i = 0; i < arr2.length; i++) {
    // arr2[0]
    // arr2[1]
    // arr2[2]
    // arr2[3]
    // ....
    // arr2[9]
    console.log(arr2[i]);
}

// 존재하지 않는 인덱스의 속성값을 호출하려고 한다면, undefined로 출력됨.
