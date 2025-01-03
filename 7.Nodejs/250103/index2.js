// ES6 async/await
const 소나타 = () => {
    // resolve : "작업 완료"
    // reject : "작업 실패"
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("소나타");
            reject("소나타 안됌 ㅠ")
        }, 2000);
    })
}

const 아반테 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("아반떼 안됌 ㅠ")
        }, 3000);
    })  
}

const 제네시스 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("제네시스");
            reject("안됌 ㅠ");
        }, 1000);
    })  
}

const 페라리 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("페라리");
            reject("페라리 안됌 ㅠ");
        }, 1000);
    })  
}
// ES8(ES2017) 문법
// async : 함수 앞에 async가 있다면 비동기 작업을 처리하는 함수로 변환
// await : await는 Promise가 처리될 때까지 기다리고, 결과값을 반환.
const call = async () => {
    // try catch문법 => 예외처리를 위한 구조 => 비동기 코드나 예외적인 상황을 처리할 때 사용
    try {
        // Promise.all() : 배열내의 모든 프로미스가 해결될 때까지 기다린 후,
        // 모든 프로미스의 결과를 배열로 반환, 만약 하나의 프로미스라도 실패하면
        // 전체 Promise.all이 실패한다. 
        // 비동기 작업을 병렬로 실행하는 쪽에 가깝다.
       const [a, b, c] = await Promise.all([소나타(), 아반테(), 페라리()]);
       console.log(a);
       console.log(b);
       console.log(c);
    } catch (error) {
        console.log(error);
    }
}

call();

// 시간이 걸리는 작업의 데이터 타입 => Promise
// Promise 즉 시간이 걸리는 작업을 응답 받는 방법

/*
    1. .then, .catch, .finally
    2. async/await 문법
*/