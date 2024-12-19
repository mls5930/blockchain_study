// 배열의 모든 값을 더하는 코드를 작성하세요
let numbers = [1, 2, 3, 4, 5];
let sum = 0;

// 반복문을 이곳에 작성하세요. 
// => 반복문이 왜 필요할까?
// sum = numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4];
// for(let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//     // sum = sum + numbers[i];
// }

for(let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i]
}

// 위에 작성한 변수 sum에다가, 배열의 모든 값을 더하여 할당하고
// 출력하세요
console.log("합계:", sum);

// 반복문을 활용한 배열 많이 사용합니다. => 중요합니다. 익숙하게 치기 위해서
// 많이 쳐봐야 합니다.


