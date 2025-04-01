const { createHash } = require("./utils/createHash")

//  간단한 블록 함수 만들어보기

//  height: 블록의 순번 (index)

const createBlock = (height, timestamp, data, previousHash, merkleroot) => {
    const block = {
        height,
        timestamp,
        data
    }
    const blockString = `${block.height}${block.timestamp}${block.data}${previousHash}`
    block.hash = createHash(blockString)
    return block
}

const block = createBlock(0, Date.now(), "나 하버드 생임!")
const block2 = createBlock(1, Date.now(), "나도 하버드생임", block.hash)
const block3 = createBlock(2, Date.now(), "나는 세 번째 하버드 생임!", block2.hash)
console.log(block);
console.log(block2);
console.log(block3);



