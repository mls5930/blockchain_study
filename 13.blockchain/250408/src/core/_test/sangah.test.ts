import Block from "@core/block/block";
import Chain from "@core/chain/chain";
import { DIFFICULTY_ADJUSTMENT_INTERVAL, GENESIS, INTERVAL } from "@core/config";

it("주기마다 difficulty 조정 확인", () => {
    const newChain = new Chain();
    // i 1~10까지 => 블록 10개 생성
    // 10개만 만드는 이유 => height 1~9인 블록들은 GENESIS difficulty와 같음 테스트하기 위함

    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] => 체인
    // [11] => GENESIS difficulty와 다름
    for (let i = 1; i <= DIFFICULTY_ADJUSTMENT_INTERVAL + 1; i++) {
      // i = 10이래
      const latestBlock = newChain.latestBlock(); // 10
      const adjustment = newChain.getAdjustmentBlock(); 
      const data = ["tx02"];
      const newBlock = Block.generateBlock(latestBlock, data, adjustment);
      newChain.addToChain(newBlock); // 생성된 블록 newChain에 추가
    }

    // 생성된 블록이 10개 이하 => GENESIS difficulty와 같음
    // 블록 0~9까지는 GENESIS difficulty와 같음
    // 블록 10~11은 GENESIS difficulty와 다름
    for (let i = 1; i < INTERVAL; i++) {
      expect(newChain.get()[i].difficulty).toBe(GENESIS.difficulty);
    }
    // 생성된 블록이 10개 초과 => GENESIS difficulty와 다름

    console.log(newChain.get()[10]);
    expect(newChain.get()[INTERVAL].difficulty).not.toBe(GENESIS.difficulty);
  });