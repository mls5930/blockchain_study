import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import CryptoModule from "@core/crypto/cryptoModule";
import { createHash } from "crypto";

// 안보고 코드를 작성한 티가 나서 그건 마음에 듦
// 문제는 잘 보았어?

const findBlock = (genesisBlock: Block) => {
    let binary: string = ""
    let hash: string;
    let nonce: number = 0;
    while(true) {
        nonce++
        let base: string = "나 엄준식이다."
        let data = base + nonce;
        genesisBlock.difficulty = 3;
        hash = createHash("SHA256").update(data).digest("hex");
        binary = CryptoModule.hashToBinary(hash);
        if(binary.startsWith("0".repeat(genesisBlock.difficulty))){
            genesisBlock.hash = hash;
            return { genesisBlock, binary, nonce }
        }
    }
}

/*
    1. difficulty 즉 출제 된 0의 개수 앞의 0개수를 비교 =>  계산의 반복
    2. 바이너리 값이 필요하지?
    3. 해시값이 필요하겠지?
    4. 해시값을 계속 트라이하는 건 무슨값이였지? => nonce
*/
describe("블록 검증 테스트", ()=> {
    let data: string[] = ["tx01"]
    let newBlock:Block = new Block(GENESIS, data);;

    it("채굴 테스트", () => {
        // 블록 후보 생성
        const { genesisBlock, binary } = findBlock(newBlock);
        expect(binary.startsWith("0".repeat(genesisBlock.difficulty))).toBe(true);
    })

    it("nonce가 0보다 큰가? 채굴을 계속 시도한게 맞았나?", () => {
        // 블록 후보 생성
        const { nonce } = findBlock(newBlock);
        expect(nonce).toBeGreaterThan(0);
    })
    
    //     | `findBlock()`     | 해시가 difficulty 조건을 만족하는가?     |
    //     | `generateBlock()` | 블록 연결이 정확한가? 해시값이 적절한가? |
    
    it("실습문제 2 generateBlock() 새로운 블럭 생성", () => {
        let data = ["tx01"]
        let data2 = ["tx02"]
        const generateBlock = new Block(GENESIS, data);
        const newBlock = Block.findBlock(generateBlock);
        const generateBlock2 = new Block(newBlock, data2);
        const newBlock2 = Block.findBlock(generateBlock2);
        expect(newBlock.hash).toEqual(newBlock2.previousHash)
    });
})