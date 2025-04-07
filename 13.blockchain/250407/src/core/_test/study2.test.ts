import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { GENESIS } from "@core/config";

describe("replaceChain 테스트", () => {
  let myChain: Chain;
  let otherChain: Chain;

  beforeEach(() => {
    myChain = new Chain();
    otherChain = new Chain();
  });

  it("1. 상대 체인이 제네시스 블록만 있을 경우 → 교체하지 않음", () => {
    const result = myChain.replaceChain([GENESIS]);
    expect(result.isError).toBe(true);
    expect(result.value).toContain("제네시스");
  });

  it("2. 상대 체인이 내 체인보다 짧거나 같을 경우 → 교체하지 않음", () => {
    const newBlock = Block.generateBlock(
      myChain.latestBlock(),
      ["tx1"],
      GENESIS // getAdjustmentBlock 안 씀
    );
    myChain.addToChain(newBlock);

    // otherChain은 Genesis만 있음
    const result = myChain.replaceChain(otherChain.get());
    expect(result.isError).toBe(true);
    expect(result.value).toContain("짧거나");
  });

  it("3. 상대 체인이 더 길 경우 → 체인 교체", () => {
    // otherChain에 블록 2개 추가
    const block1 = Block.generateBlock(otherChain.latestBlock(), ["tx1"], GENESIS);
    const block2 = Block.generateBlock(block1, ["tx2"], GENESIS);
    otherChain.addToChain(block1);
    otherChain.addToChain(block2);

    const result = myChain.replaceChain(otherChain.get());
    expect(result.isError).toBe(false);
    expect(myChain.length()).toBe(3);
  });
});
