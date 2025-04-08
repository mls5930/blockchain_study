import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import CryptoModule from "@core/crypto/cryptoModule";

// 우리가 구현한 블록의 메서드로 따지자면 몇개??
// 4개임
describe("block test", () => {
    it("머클 루트", () => {
        let newBlock: Block
        let data = ["tx01"]
        const merkleRoot = Block.getMerkleRoot<string>(data)
        // 1. 문자열인가??
        // 2. 해시의 기본조건 => 64자리가 맞아??

        // A기 B여야 한다 => 이 값이 이렇게 나와야 테스트 통과
        // 통과 기준 => merkle의 타입이 string이여야 PASS야
        expect(typeof merkleRoot).toBe("string");
        expect(merkleRoot.length).toBe(64);
    })
    it("해시 생성", () => {
        const hash = Block.createBlockHash(GENESIS)

        expect(hash.length).toBe(64);
    })
    // 제네시스의 해시 === 다음 블록 previousHash
    it("이전의 해시와 다음 블록 이전 해시 비교", () => {
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

    /*
        1. nonce값
        2. 채굴 => base + nonce => 새 해쉬 => while(true)
        3. 2진수 => CryptoModule.hashToBinary(hash)
        4. binary.startWith("0".repeat(difficulty))
    */
    const findBlock = (newBlock: Block) => {
        let nonce: number = 0;
        let hash: string;
        let binary: string;
        let data: string;

        while (true) {
            nonce++
            newBlock.nonce = nonce;
            hash = Block.createBlockHash(newBlock);
            data = hash + nonce
            binary = CryptoModule.hashToBinary(data);
            if(binary.startsWith("0".repeat(newBlock.difficulty))) {
                newBlock.hash = hash;
                return { newBlock, binary }
            }
        }
    }

    it("findBlock", () => {
        const data = ["tx01"]
        let genesisBlock = new Block(GENESIS, data);
        genesisBlock.difficulty = 3;
        const { newBlock, binary } = findBlock(genesisBlock);
        console.log(newBlock.nonce);
        console.log(binary);
        
        expect(newBlock.nonce).toBeGreaterThan(0);
        // 자 여기에서 hash값을 2진수 값 => 바이너리 데이터 값으로 변환하면 되는거임.

        expect(binary.startsWith("0".repeat(newBlock.difficulty))).toBe(true);
    })
    // it("generateBlock", () => {
    //     let data = ["tx02"]
    //     let data2 = ["tx03"]

    //     const newBlock = Block.generateBlock(GENESIS, data)
    //     const newBloc2 = Block.generateBlock(newBlock, data2)

    //     expect(newBlock.hash.length).toBe(64)
    //     expect(newBlock.hash).toEqual(newBlock.previousHash);

    // })
})