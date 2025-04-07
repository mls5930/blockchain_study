import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import CryptoModule from "@core/crypto/cryptoModule";

// 우리가 구현한 Block 메서드로 따지자면 4개
describe("FindBlock 메서드 테스트", () => {

  it("findBlock", () => {
    const data = ["tx02"];
    const block = new Block(GENESIS, data);
    block.difficulty = 4;

    const result = Block.findBlock(block);
    // nonce가 1 이상
    expect(result.nonce).toBeGreaterThan(0);
    expect(result.merkleRoot.length).toBe(64);
    // hash 길이 64
    expect(result.hash.length).toBe(64);
    // hash를 binary로 변환 시 0이 difficulty만큼?
    const binary = CryptoModule.hashToBinary(result.hash);
    expect(binary.startsWith("0".repeat(result.difficulty))).toBe(true);
  });
});
