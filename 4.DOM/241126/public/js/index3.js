// 
//     실습

//     1. 버튼 1을 눌렀을 때, id="display"의 색깔을 변경하세요.(blue)
//     2. 버튼 2를 눌렀을 때, id="display"의 텍스트를 변경하세요(나는 바뀐 텍스트).
//     3. 버튼 2를 눌렀을 때, id="display"에 1번에 
//     적용시킨 색깔을 똑같이 적용하세요.
//     4. 버튼 2를 눌렀을 때, id="display"에 width, height 각각 200px씩
//     적용되도록 하세요.

// 1. 이벤트를 등록시킬 애는 누구? 버튼을 "눌렀(click)"했을 때
// => addEventListenr => 버튼1, 버튼2
// 2. "변경" 및 "적용"하세요 => display 접근해서 변경
// 버튼1과 버튼2 display 상수가 필요하겠다 => element를 끌고와야 하니까.

const btn = document.querySelector('#btn');
const btn2 = document.querySelector('#btn2');
const display = document.querySelector('#display');

const colorChange = () => {
    display.style.color = "blue";
}
const textChange = () => {
    display.innerHTML = "나는 바뀐 텍스트";
}
const widthHeightChange = () => {
    display.style.width = "200px";
    display.style.height = "200px";
}

btn.addEventListener("click", colorChange);
btn2.addEventListener("click", textChange);
btn2.addEventListener("click", colorChange);
btn2.addEventListener("click", widthHeightChange);

// 1. 등록시킬 이벤트의 주체 => btn, btn2
// 2. 해당 이벤트에 연결한 함수안에 적용시킬(style,color 등등) 주체 => display
// 오늘 오전 처음 배웠는데 머리 많이 아픕니다....미안합니다....