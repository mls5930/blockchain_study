// import Block from "../block/block";
// import { GENESIS } from "../../config";
import Block from "@core/block/block";
import { GENESIS } from "@core/config";

describe("block 검증", () => {
    let newBlock: Block;
    let newBlock2: Block;
    it("블록 추가", () => {
        const data = ["tx02"];
        newBlock = Block.generateBlock(GENESIS, data);
      
        const data2 = ["tx03"];
        newBlock2 = Block.generateBlock(newBlock, data2);
      });
      it("블록 유효성 검증", ()=>{
        const isValidBlock = Block.isValidNewBlock(newBlock2, GENESIS);
        // 이전 블록과 비교했을때 새로 추가된 블록이 유효한 블록인지
        if(isValidBlock.isError) {
            // expect : toBe 값이 맞는지 확인하고 어떤 결과값이 출력되었어야하는지 알려준다.
            return expect(isValidBlock.isError).toBe(false);
        }
        // false 가 나와야하는데 맞니?
        expect(isValidBlock.isError).toBe(false);
    })
});