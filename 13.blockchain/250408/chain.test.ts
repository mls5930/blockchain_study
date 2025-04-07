import Chain from "@core/chain/chain";
import Block from "@core/block/block";

describe("Chain 전체 흐름 테스트", () => {
  let chain: Chain;
  let data: string[] = ["tx-data"];

  beforeEach(() => {
    chain = new Chain();
  });

  it("1. 여러 블록을 추가하고, 전체 체인 길이와 마지막 블록을 확인한다", () => {
    for (let i = 0; i < 15; i++) {
      const prev = chain.latestBlock();
      const adjustment = chain.getAdjustmentBlock();
      const newBlock = Block.generateBlock(prev, data, adjustment);
      chain.addToChain(newBlock);
    }

    expect(chain.length()).toBe(16); // GENESIS + 15개
    expect(chain.latestBlock().height).toBe(15);
  });

  it("2. 특정 블록을 height와 hash로 조회한다", () => {
    for (let i = 0; i <= 4; i++) {
        const prev = chain.latestBlock();
        const adjustment = chain.getAdjustmentBlock();
        const newBlock = Block.generateBlock(prev, data, adjustment);
        chain.addToChain(newBlock);
      }
    // height 조회
    const blockByHeight = chain.getBlockByHeight(5);
    expect(blockByHeight.height).toBe(5);

    // hash 조회
    const blockByHash = chain.getBlockByHash(blockByHeight.hash);
    expect(blockByHash.hash).toBe(blockByHeight.hash);
  });

  it("3. 더 짧은 체인을 replaceChain() 하려 하면 실패해야 한다", () => {
    const newChain = new Chain(); // 새 체인은 GENESIS만 있음
    const result = chain.replaceChain(newChain.get());

    expect(result.isError).toBe(true);
    expect(result.value).toContain("짧거나 같습니다");
  });

  it("4. 더 긴 체인은 교체가 되어야 한다", () => {
    const newChain = new Chain();

    for (let i = 0; i < 20; i++) {
      const prev = newChain.latestBlock();
      const adjustment = newChain.getAdjustmentBlock();
      const newBlock = Block.generateBlock(prev, data, adjustment);
      newChain.addToChain(newBlock);
    }

    const result = chain.replaceChain(newChain.get());

    expect(result.isError).toBe(false);
    expect(chain.length()).toBe(21);
  });
});

/*
  it("3. DIFFICULTY_ADJUSTMENT_INTERVAL 주기 이후 블록의 난이도가 바뀌는가?", () => {
    // INTERVAL만큼 블록을 생성
    for (let i = 1; i <= DIFFICULTY_ADJUSTMENT_INTERVAL; i++) {
      const prev = chain.latestBlock();
      const adjustment = chain.getAdjustmentBlock();
      const newBlock = Block.generateBlock(prev, data, adjustment);
      chain.addToChain(newBlock);
    }
  
    const prevBlock = chain.latestBlock();
    const adjustment = chain.getAdjustmentBlock();
    const nextBlock = Block.generateBlock(prevBlock, data, adjustment);
  
    expect(nextBlock.difficulty).not.toBe(prevBlock.difficulty);
  });
  

*/