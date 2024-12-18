// 1. 계산을 수행하는 calculator 함수 선언 
// fn => function
// fn = add, fn = sub, fn = mul
function calculator(num1, num2, fn) {
    return fn(num1, num2);
}

// 2. 더하기 함수 선언
function add(num1, num2) {
    return num1 + num2;
}

// 3. 빼기 함수 선언
function sub(num1, num2) {
    return num1 - num2;
}

// 4. 곱하기 함수 선언
function mul(num1, num2) {
    return num1 * num2;
}

const num1 = Number(prompt("첫 번째 숫자를 입력하세요."));
const num2 = Number(prompt("두 번째 숫자를 입력하세요."));
const cal = prompt("연산을 선택하세요.", "add, sub, mul");
let result;

if(cal === "add") {
    result = calculator(num1, num2, add);
}
if(cal === "sub") {
    result = calculator(num1, num2, sub);
}
if(cal === "mul") {
    result = calculator(num1, num2, mul);
}

alert(result);