// 1. src/core/_test 폴더 생성
// 2. _test/block.test.ts 파일 생성

import Block from "@core/block/block"
import { GENESIS } from "@core/config"


// 우리가 구현한 블록의 메서드로 따지자면 몇 개?
describe("block 테스트", () => {
    it("머클 루트", () => {
        let newBlock: Block
        let data = ["tx01"];
        const merkleRoot = Block.getMerkleRoot<string>(data)
        // 1. 문자열인가?
        // 2. 해시의 기본조건 => 64자리가 맞는가?
        // A 가 B여야 한다 => 이 값이 이렇게 나와야 테스트 통과야!
        //  통과기준 => merkle의 타입이 string이여야 PASS 줄게 
        expect(typeof merkleRoot).toBe("string");
        expect(merkleRoot.length).toBe(64);
    })
    it("해시 생성", () => {
        const hash = Block.createBlockHash(GENESIS);
        expect(hash.length).toBe(64)
    })
    // 제네시스의 해시 === 다음 블록 previousHash
    it("이전의 해시와 다음 블록 이전 해시 비교", () => {
        let newBlock: Block
        let newBlock2: Block;
        let newBlock3: Block
        let newBlock4: Block;

        let data = ["tx01"]
        let data2 = ["tx02"]
        let data3 = ["tx03"]
        let data4 = ["tx04"]
        newBlock = new Block(GENESIS, data);
        newBlock2 = new Block(newBlock, data2)
        newBlock3 = new Block(newBlock2, data3);
        newBlock4 = new Block(newBlock3, data4)
        expect(newBlock.hash).toEqual(newBlock2.previousHash)
        expect(newBlock2.hash).toEqual(newBlock3.previousHash)
        expect(newBlock3.hash).toEqual(newBlock4.previousHash)
    })
    // it("fingBlock", () => {})
    // it("generateBlock", () => { })




    // - 블록을 하나 생성한 뒤 `findBlock()` 메서드를 실행하여 채굴
    // - 채굴된 블록의 `hash`는 반드시 difficulty 조건을 만족해야 함

    // it("실습문제 1 findBlock()", () => {

    //     let data = ["tx01"];
    //     const generateBlock = new Block(GENESIS, data);
    //     const newBlock = Block.findBlock(generateBlock);
    //     generateBlock.difficulty = 3;
    //     console.log(newBlock.hash);
    //     console.log(generateBlock.hash);
    //     expect(newBlock.hash).toBe("".startsWith("000"))

    // })

    //     | `findBlock()`     | 해시가 difficulty 조건을 만족하는가?     |
    //     | `generateBlock()` | 블록 연결이 정확한가? 해시값이 적절한가? |

    it("실습문제 2 generateBlock() 새로운 블럭 생성", () => {

        let data = ["tx01"]
        let data2 = ["tx02"]
        const generateBlock = new Block(GENESIS, data);
        const newBlock = Block.findBlock(generateBlock);
        const generateBlock2 = new Block(newBlock, data2);
        const newBlock2 = Block.findBlock(generateBlock2);
        console.log(newBlock.hash);
        console.log(newBlock2.previousHash);

        // console.log
        // cfd571bb4ea9760eef11ec1f13e2f4c85b22a2f231bcebb893664c2f6559db3f

        //  console.log
        // cfd571bb4ea9760eef11ec1f13e2f4c85b22a2f231bcebb893664c2f6559db3f



        expect(newBlock.hash).toEqual(newBlock2.previousHash)
    });
});