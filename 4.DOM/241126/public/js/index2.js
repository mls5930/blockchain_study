// 이전까진 이벤트 등록 => 내가 어떤 행동을 했을 때, 함수를 실행시키는 행위
// 지금은 이벤트 삭제

const btn = document.querySelector('#btn');
const btn2 = document.querySelector('#btn2');

function a() {
    console.log("나는 첫 번째 함수");
}

function b() {
    console.log("나는 두 번째 함수");
}

btn.addEventListener("click", a);
btn.addEventListener("click", b);
btn.removeEventListener("click", b);

// 기존의 함수 재활용
btn2.addEventListener("click", a);