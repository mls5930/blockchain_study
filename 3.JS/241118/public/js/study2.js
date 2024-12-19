/*
    1. 인자값들을 이용해서 자신이 원하는 단을 나오게 구현해보세요.

    ex => 나는 2단부터 9단까지 나오게 하겠습니다.

    반환값 => return (내가 반환할 값) => 아래 코드로 치자면 result 변수에 반환하여 할당하겠다.
    2. 함수의 반환값으로 "first_dan단부터 second_dan단까지 나오게 했습니다!"라는 문자열 값 반환

    3. 전역 스코프에 변수를 선언하여 해당 함수를 호출하고 나온 반환값을 변수에 할당. 
    => alert()에 변수를 넣어서 창에 띄워지게 해보세요.
    => alert(나는 2단부터 9단까지 나오게 하겠습니다. => 반환값)
*/
function gugudan(first_dan, second_dan) {
    for(let i = first_dan; i <= second_dan; i++) {
        for(let z = 1; z <= 9; z++) {
            console.log(i + "X" + z + "=" + i * z);
        }
        console.log(" ");
    }
    return first_dan + "단 부터" + second_dan + "단 까지 나오게 했습니다.!";
    // 리턴(반환값)아래에 오는 코드들은 실행이 안됩니다.
}

// Number => prompt값을 숫자로 변환한다.
// 사용자한테 prompt로 입력한 값을 변수에 담을 때, 기본적으로 문자열임.
// 사용자에게 받는 값을 숫자로 강제 형변환 시켜야 함.
let first_dan = Number(prompt("몇 단부터 시작할까?"));
let second_dan = Number(prompt("몇 단까지 나오게 할까?"));
let result = gugudan(first_dan, second_dan); // result의 데이터타입은? => 문자열
alert(result);