const out1 = "나도 내보내지나?"

function a() {
   function d() {
    function f() {
        console.log("asd");
    }
    f();
   }
   d();
}

const object1 = {
    a,
    out1
}

// module.exports = {a, out1}
module.exports = object1

/*
    요약

    콜스택 : 자바스크립트의 실행되는 모든 동기적 코드를 관리하는 공간.
    백그라운드 : 시간이 오래 걸리는. => 비동기 작업을 처리하는 공간.
    이벤트큐 : 백그라운드에서 타이머가 끝나면 보관하는 임시 공간.
    이벤트 루프 : 콜스택과 이벤트 큐를 관리(항상 주시한다.)
*/