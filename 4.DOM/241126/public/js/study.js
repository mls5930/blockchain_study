const lottoBox = document.querySelectorAll('#lotto > li');
const lottoBtn = document.querySelector('#lottoBtn');

function between(x, min, max) {
    return x >= min && x <= max; 
}

function circleColor(currentIndex, target) {
    if(between(target, 40, 45)) {
        // 특정 태그에 class이름을 부여하는 과정
        lottoBox[currentIndex].classList.add("a");
        lottoBox[currentIndex].innerHTML = target;
        // style을 이용해서 배경색, 폰트크기 등등을 변경하는건 추천하지 않음
        // 하지만, class이름을 자바스크립트로 부여하는건 괜찮음. => 많이 사용한다.
    }
    if(between(target, 30, 39)) {
        lottoBox[currentIndex].classList.add("b");
        lottoBox[currentIndex].innerHTML = target;
    }
    if(between(target, 20, 29)) {
        lottoBox[currentIndex].classList.add("c");
        lottoBox[currentIndex].innerHTML = target;
    }
    if(between(target, 10, 19)) {
        lottoBox[currentIndex].classList.add("d");
        lottoBox[currentIndex].innerHTML = target;
    }
    if(between(target, 1, 9)) {
        lottoBox[currentIndex].classList.add("e");
        lottoBox[currentIndex].innerHTML = target;
    }
}

function linearSearch(array, target) {
    for(let i = 0; i < array.length; i++) {    
        if(array[i] === target){
            return;
        }
    }

    array.push(target);
    const currentIndex = array.length - 1;
    circleColor(currentIndex, target);
}

function createCircle () {
    for(let i = 0; i < lottoBox.length; i++) {
        lottoBox[i].className = "";
    }
    const array1 = []
    while(true) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if(array1.length === 6){
            break; 
        }
        linearSearch(array1, randomNum)
    }
}

lottoBtn.addEventListener('click', createCircle);
