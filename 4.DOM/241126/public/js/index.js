/*
    이벤트 무엇인데?

    브라우저 기준으로 설명하면 렌더된 우리의 화면 영역에서
    'click', 'mouseover', 'mouseout' 등등
    위와 같은 특정 행동을 취했을 때, 특정한 함수를 호출하는 것.

    문법

    on[Event 이름]

    - onclick
    - onmouseout
    - onmouseover

    on이란 이름이 붙어있다면 대부분 이벤트입니다.
*/

let a = 1;
a = 2;

const btn = document.querySelector("#btn");

// DOM 속성으로 넣는 방법
// btn.onclick = function colorChange() {
//     btn.style.background = "blue";
//     btn.style.color = "red";
// }

// btn.onclick = function textChange() {
//     btn.innerHTML = "얘는 로그인 버튼";
// }

// 함수를 하나만 적용하는건데, 2개 이상 쓰고 싶은 경우가 생긴다.
function colorChange() {
    btn.style.background = "blue";
    btn.style.color = "red";
}

function textChange() {
    btn.innerHTML = "로그인 버튼";
}

btn.addEventListener('click', colorChange)
btn.addEventListener('click', textChange)

// 위의 작동 방식을 함수로 표현하자면 다음과 같다.
function addeventlistener(event, callback) {
    if(event === "click") {
        callback();
    }
}

function handler() {
    return console.log("hello!!");
}

addeventlistener('click', handler)