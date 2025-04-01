// 블록체인에서 블록을 대략 생성해보고 ,각 블록의 해시를 계산하는걸 해보자

const crypto = require("crypto");

const createHash = (data) => {
    // hex => 16진수
    // createHash().update()는 문자열이나 Buffer여야 함
    const dataString = JSON.stringify(data);
    const hash = crypto.createHash("SHA256").update(dataString).digest("hex");
    return hash
}

// 이제 블록이라는 값을 가정하고 비교를 해보겠음

const genesisBlock = {
    version: "1.0.0",
    height: 0,
    timestamp: new Date().getTime(),
    data: "나 하버드 생임",
    previousHash: "0".repeat(64)
}

const genesisBlockHash1 = createHash(genesisBlock);

const block2 = {
    version: "1.0.0",
    height: 0,
    timestamp: new Date().getTime(),
    data: "block1 따라서 나도 하버드 생임",
    previousHash: genesisBlockHash1
}

const block2Hash = createHash(block2)

console.log(genesisBlockHash1);
console.log(block2);

/*
    해시 함수는 다음과 같은 특징을 가짐

    1. 단방향성: 입력값을 해시로 바꾸는 것은 쉬움. 하지만 해시값만 보고 입력값을 알아내는 것은 불가능에 가깝다
    2. 충돌회피성: 서로 다른 두 입력값이 같은 해식밧을 갖지 않도록 설계되어야 함
    3. 무작위성 / 민감성: 입력값이 조금만 달라져도 해시 결과가 달라진다.
*/