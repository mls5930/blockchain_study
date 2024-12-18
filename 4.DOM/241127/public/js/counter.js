const counter = document.querySelector("#counter");
const increment = document.querySelector("#increment");
const decrement = document.querySelector("#decrement");

let num = 0;

counter.innerHTML = num;

// + "눌렀"을때 증가
// - "눌렀"을때 감소
// 이벤트 객체는 => 누가 나를 이벤트에 등록했는가에 대한 객체(정보 덩어리)
function handler(e) {
    // e.type => 이벤트 종류가 무엇인가? click인지...mouseover인지...
    // e.target => 누가 눌렀는가?
    // 플러스 버튼을 눌렀을때 증가하는 기능
    if(e.target.id === "increment") {
        counter.innerHTML = ++num;
    }
    // 마이너스 버튼을 눌렀을때 증가하는 기능
    if(e.target.id === "decrement") {
        counter.innerHTML = --num;
    }
}

// increment를 "눌렀"을때 증가
// decrement를 "눌렀"을때 감소
increment.addEventListener("click", handler);
decrement.addEventListener("click", handler);

