import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import CryptoModule from "@core/crypto/cryptoModule";

// 우리가 구현한 Block 메서드로 따지자면 4개
describe("BLOCK test", () => {
  it("merkleRoot", () => {
    let data = ["tx01"];
    const merkleRoot = Block.getMerkleRoot<string>(data);
    // 1. 문자열인가?
    // 2. 해시의 기본 조건 => 64자리가 맞는가?

    // A가 B여야 한다   << 이 값이 이렇게 나와야 테스트 통과임
    // 통과 기준 => merkle의 타입이 string이어야 PASS
    expect(typeof merkleRoot).toBe("string");
    expect(merkleRoot.length).toBe(64);
  });

  it("hash 생성", () => {
    const hash = Block.createBlockHash(GENESIS);
    expect(hash.length).toBe(64);
  });

  //   제네시스 해시 === 다음 블록 preciousHash
  it("이전 해시와 다음 블록 이전 해시 비교", () => {
    let newBlock: Block;
    let newBlock2: Block;

    let data = ["tx01"];
    let data2 = ["tx02"];
    newBlock = new Block(GENESIS, data);
    newBlock2 = new Block(newBlock, data2);

    expect(newBlock.hash).toEqual(newBlock2.previousHash);
  });

  it("findBlock", () => {
    const data = ["tx02"];
    const block = new Block(GENESIS, data);
    block.difficulty = 4;

    const result = Block.findBlock(block);
    console.log("findBlock", result);

    // nonce가 1 이상
    expect(result.nonce).toBeGreaterThan(0);
    // hash 길이 64
    expect(result.hash.length).toBe(64);
    // hash를 binary로 변환 시 0이 difficulty만큼?
    const binary = CryptoModule.hashToBinary(result.hash);
    expect(binary.startsWith("0".repeat(result.difficulty))).toBe(true);
  });

  it("generateBlock", () => {
    let data = ["tx03"];
    let data2 = ["tx04"];
    const block = Block.generateBlock(GENESIS, data);
    const block2 = Block.generateBlock(block, data2);
    console.log("generateBlock", block);
    console.log("generateBlock2", block2);
    // hash 길이 63
    expect(block.hash.length).toBe(64);
    // 이전 블록 해시 === 다음 블록 preciousHash
    expect(block.hash).toEqual(block2.previousHash);
  });
});
