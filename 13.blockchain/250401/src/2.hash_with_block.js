const { createHash } = require("./utils/createHash")

// 간단 블록 함수 만들어보기

// height: 블록의 순번 (index)
// previousHash: 이전 블록의 해시값을 포함하기 때문에 체인 형태로 연결되고, 신뢰와 무결성이 유지된다.
const createBlock = (height, timestamp, data, previousHash) => {
    const block = {
        height,
        timestamp,
        data,
    }
    const blockString = `${block.height}${block.timestamp}${block.data}${previousHash}`
    block.hash = createHash(blockString);
    return block
}
const block = createBlock(0, Date.now(), "나 하버드 생임!", "0".repeat(64));
const block2 = createBlock(1, Date.now(), "나도 하버드생임", block.hash);
const block3 = createBlock(2, Date.now(), "나는 세 번째 하버드 생임!", block2.hash)

console.log(block);
console.log(block2);

