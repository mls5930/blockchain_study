// Math.random() => Math => 숫자 연산에 도움을 주는 기능을 가지고 있는
// 내장 객체
// 0이상 1미만의 난수(랜덤한 실수)를 생성하는 메서드

const array1 = []

function linearSearch(array, target) {
    for(let i = 0; i < array.length; i++){    
        if(array[i] === target){
            // 위의 배열에서 중복된 숫자를 찾았으면 그대로 함수 종료.
            return i;
        }
    }
    // 못찾았다 => 중복된 공을 찾지 못했다.
    array1.push(target);
}

function createCircle () {
    // 무한 루프를 상정하고 만듬
    while(true) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if(array1.length === 6){
            break; // => 반복을 멈춘다.
        }
        linearSearch(array1, randomNum)
    }
}

createCircle();

console.log(array1);


