const crypto = require("crypto");
const data = "어떻게 사람 이름이 엄준식 ㅋㅋ";
const data2 = "어떻게 사람 이름이 엄준식 ㅋㅋㅋ";

// 위의 데이터를 해시화 하고 싶다.
// 함수 하나를 만들어 볼게요

const createHash = (data) => {
    // hex => 16진수
    const hash = crypto.createHash("SHA256").update(data).digest("hex");
    return hash
}

console.log(createHash(data)); // a1eea4eb1e44d284097e87c43a9cc243a1517d4ca283b1cc9564a5a49c3c2d9b
console.log(createHash(data2)); // 3a408d3693e24201ce62d507715ab2edb5351f31bbe27a4ac56e1e04b0821820

// 이제 블록이라는 값을 가정하고 비교를 해보겠음

const block1 = {
    version: "1.0.0",
    height:0,
    timestamp: new Date().getTime(),
    data: "나 하버드 생임",
}

module.exports = {
    createHash
}


/*
    - createHash("sha256") : SHA-256 알고리즘 사용
    - .update(data): 입력 데이터를 추가
    - .digest("hex"): 결과를 16진수 문자열로 변환

    SHA-256

    암호학에서 중요한 해시 알고리즘 중 하나
    입력된 데이터를 일정한 길이의 "디지털 지문"으로 만들어 줌
    이 지문은 입력이 무엇이든 항상 같은 길이 256비트로 출력
    아주 작은 변화에도 완전히 달라지기 때문에, 데이터의 무결성을 확인할 때 사용함.

    256

    1비트 => 0과 1

    이 0과 1로 표현할 수 있는 가짓수는 2의 256제곱
    이 숫자는 상상할 수 없을 만큼 큽니다.

    256비트를 16진수로 표현 => 256 나누기 4 = 64자리
    쉽게 말하면, 256비트의 데이터가 0부터 15까지(0~9, A-Z)의 숫자와 문자를 조합한 64자리 문자열로 표현
    => SHA-256 해시 값
*/