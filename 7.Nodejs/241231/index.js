// const num1 = 10;
// const num2 = 20;

// const add = (num1, num2) => {
//     return num1 + num2
// }

// console.log(add(num1, num2));

// 객체 안에 있는 함수를 메서드 라고 합니다.
const calculator = {
    add: function (num1, num2) {
        return num1 + num2 
    },
    mul: function (num1, num2) {
        return num1 * num2
    },
    div: function (num1, num2) {
        return num1 / num2
    }
}

console.log(calculator.add(30, 50));
console.log(calculator.mul(30, 50));
console.log(calculator.div(30, 50));