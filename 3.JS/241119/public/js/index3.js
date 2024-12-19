// 함수도 값이니까 인자값으로 특정 함수를 던져줄 수 있지 않을까?
// 함수를 누가 호출했는지 잘 봐야함.

// 함수를 하나 선언합니다.
// 인사를 할 수 있는 함수.
function hello(print) {
    let js = "javascript";
    // 인자로 전달받은 함수 그 자체인 print를 호출했다.
    let result = print(js);
    return result;
}

// 함수를 하나 더 선언합니다.
function print(name) {
    return "안녕하세요!" + name
}

let result = hello(print);
console.log(result); // "javscript" 문자열타입