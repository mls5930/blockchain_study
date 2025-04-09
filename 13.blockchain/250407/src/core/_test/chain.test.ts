import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/config";

describe("🧪 난이도 조정 흐름 테스트 - 단계별", () => {
  let chain: Chain;
  const data = ["tx"];

  beforeEach(() => {
    chain = new Chain();
  });

  it("1단계. 최신 블록을 가져온다", () => {
    const prev = chain.latestBlock();
    expect(prev).toEqual(GENESIS);
  });

  it("2단계. 조정 기준 블록(adjustment)을 설정한다", () => {
    const i = 5;
    let adjustment: Block;
    
    if (i >= DIFFICULTY_ADJUSTMENT_INTERVAL) {
      const index = i - DIFFICULTY_ADJUSTMENT_INTERVAL;
      adjustment = chain.get()[index];
    } else {
      adjustment = GENESIS;
    }
  
    expect(adjustment).toEqual(GENESIS); // 아직 블록이 부족하니까 GENESIS가 나옴
  });
  

  it("3단계. 블록을 생성하고 체인에 추가한다", () => {
    const prev = chain.latestBlock();
    const adjustment = GENESIS;
    const newBlock = Block.generateBlock(prev, data, adjustment);
    const added = chain.addToChain(newBlock);

    expect(chain.length()).toBe(2);
    expect(added).toEqual(newBlock);
    expect(added.previousHash).toBe(prev.hash);
  });

  it("4단계. 주기만큼 블록을 추가하고 난 후, 다음 블록을 생성한다", () => {
    for (let i = 1; i <= DIFFICULTY_ADJUSTMENT_INTERVAL + 1; i++) {
      let adjustment: Block;
      const prev = chain.latestBlock()
      
      if (i > DIFFICULTY_ADJUSTMENT_INTERVAL) {
        const index = i - DIFFICULTY_ADJUSTMENT_INTERVAL;
        adjustment = chain.get()[index];
      } else {
        adjustment = GENESIS;
      }
      const newBlock = Block.generateBlock(prev, data, adjustment);
      chain.addToChain(newBlock);
    }
  });

  it("5단계. 난이도가 조정되는지 확인한다", () => {
    for (let i = 1; i <= DIFFICULTY_ADJUSTMENT_INTERVAL + 1; i++) {
      let adjustment: Block;
      const prev = chain.latestBlock()
      
      if (i > DIFFICULTY_ADJUSTMENT_INTERVAL) {
        const index = i - DIFFICULTY_ADJUSTMENT_INTERVAL;
        adjustment = chain.get()[index];
      } else {
        adjustment = GENESIS;
      }
      const newBlock = Block.generateBlock(prev, data, adjustment);
      chain.addToChain(newBlock);
    }
    
    const prevBlock = chain.latestBlock();
    
    const adjustment = chain.get()[chain.length() - DIFFICULTY_ADJUSTMENT_INTERVAL];
    expect(adjustment.difficulty).not.toBe(prevBlock.difficulty);
  });
});
