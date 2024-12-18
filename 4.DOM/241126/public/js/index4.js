const btn = document.querySelector("#btn");
const btn2 = document.querySelector("#btn2");
const display = document.querySelector("#display");
// 기본적으로, 이벤트에 등록되었어도, 등록된 함수는 자기(handler)가 이벤트에
// 등록되어있는지 모릅니다.
// 그래서 그걸 알게 해주도록 도와주는게 event 객체입니다.
function handler (e) {
    // 이벤트 "객체"이기 때문에 점 표기법으로 접근 가능함.
    if(e.type === "click") {
        // 클래스 추가
        display.classList.add('red');
        // 클래스 제거
        display.classList.remove('none');
    }
}
function handler2 (e) {
    // 이벤트 "객체"이기 때문에 점 표기법으로 접근 가능함.
    if(e.type === "click") {
        display.classList.add('none');
        display.classList.remove('red');
    }
}

btn.addEventListener("click", handler);
btn2.addEventListener("click", handler2);