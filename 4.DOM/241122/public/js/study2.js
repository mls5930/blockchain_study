/*
    1. 각 span 태그들을 선택해서 전부 가져옵니다
    2. 0: span1-1, 1: span1-2, 2: span1-3
    => 반복문과 innerHTML을 활용하여 위의 내용을
    각각 주입하세요.
*/

const spanArray = document.getElementsByTagName("span");

for(let i = 0; i < 3; i++) {
    spanArray[i].innerHTML = "span1 - "  + (i + 1);
}
