// 1. src/core/_test 폴더 생성
// 2. _test/block.test.ts 파일 생성

import Block from "@core/block/block";
import { GENESIS } from "@core/config";

// 우리가 구현한 블록의 메서드로 따지자면 몇 개?
// 4개임
describe("block 테스트", ()=> {
    it("머클 루트", () => {
        let data = ["tx01"];
        const merkleRoot = Block.getMerkleRoot<string>(data);
        // 1. 문자열인가?
        // 2. 해시의 기본조건 => 64자리가 맞는가?

        // A가 B여야 한다! => 이 값이 이렇게 나와야 테스트 통과야!
        // 통과기준 => merkle의 타입이 string이여야 PASS 줄게
        expect(typeof merkleRoot).toBe("string");
        expect(merkleRoot.length).toBe(64);
    })
    it("해시 생성", () => {
        const hash = Block.createBlockHash(GENESIS);
        
        expect(hash.length).toBe(64);
    })
    // 제네시스의 해시 === 다음 블록 previousHash
    it("이전의 해시와 다음 블록 이전 해시 비교",()=> {
        let newBlock: Block;
        let newBlock2: Block;
        let newBlock3: Block;
        let newBlock4: Block;

        let data = ["tx01"]
        let data2 = ["tx02"]
        let data3 = ["tx03"]
        let data4 = ["tx04"]

        newBlock = new Block(GENESIS, data);
        newBlock2 = new Block(newBlock, data2);
        newBlock3 = new Block(newBlock2, data3);
        newBlock4 = new Block(newBlock3, data4);

        expect(newBlock.hash).toEqual(newBlock2.previousHash);
        expect(newBlock2.hash).toEqual(newBlock3.previousHash);
        expect(newBlock3.hash).toEqual(newBlock4.previousHash);
    })
    // it("findBlock", () => {})
    // it("generateBlock", () => {})
})