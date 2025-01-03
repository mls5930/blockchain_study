const 소나타 = () => {
    // resolve : "작업 완료"
    // reject : "작업 실패"
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("소나타");
            reject("안됌 ㅠ")
        }, 3000);
    })
}

const 아반테 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("아반테");
            reject("아반떼 안됌 ㅠ")
        }, 3000);
    })  
}

const 제네시스 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("제네시스");
            reject("안됌 ㅠ");
        }, 3000);
    })  
}

const 페라리 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("페라리");
            reject("안됌 ㅠ");
        }, 3000);
    })  
}

/*
    콜스택

    결과물 출력 순서

    소나타
    페라리
    제네시스
    아반테

    순서를 바꿔보자

    아반테
    제네시스
    소나타
    페라리
    아반테
    제네시스
    소나타
    페라리
*/

// 아반테(() => {
//     제네시스(() => {
//         소나타(() => {
//             페라리(() => {
//                 아반테(() => {
//                     제네시스(() => {
//                         소나타(() => {
//                             페라리(() => {
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })

// 코드 가독성이 너무 좋지 않다.
// 성공했는지 실패했는지 모른다.

// const pr = new Promise();

/*            state
    Promise <pending>

    state

     - pending (대기 중)
     - fulfilled (이행됨)
     - rejected (거부됨)
*/

/*
    아반테
    제네시스
    소나타
    페라리
    아반테
    제네시스
    소나타
    페라리
*/

아반테()
// Promise객체에서 비동기 작업이 완료된 후에 실행할 코드
// data = "아반떼"
    .then((data) => {
        console.log(data);
        return 제네시스();
    })
// data = "제네시스"
    .then((data) => {
        console.log(data);
        return 소나타();
    })
    .catch((error) => {
        // 아반떼 실행시켰는데 rejected됐다.
        // 소나타 안됌 ㅠ
        console.log(error);
    })



