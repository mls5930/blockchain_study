import Block from "@core/block/block";
import { GENESIS } from "@core/config";


describe("generateBlock 기능 테스트", ()=> {
    let newBlock: Block;
    let newBlock2: Block;

    let data = ["`The Times 03/Jan/2009 Chancellor on brink of second bailout for banks`"];
    let data2 = ['나 엄준식임']
    it("새 블록의 `previousHash`는 GENESIS의 `hash`와 같아야 함", ()=> {
        newBlock = Block.generateBlock(GENESIS, data);
        newBlock2 = Block.generateBlock(newBlock, data2);

        // toBe나 toEqual이나 객체를 기준으로 비교
        // toBe는 객체 주소값까지 동일한가?
        // toEqual은 속성의 값만 동일한가?
        expect(newBlock2.previousHash).toEqual(newBlock.hash);
    })

    it("새 블록의 `hash`도 64자리이고, 조건을 만족해야 함", ()=> {
        expect(newBlock.hash.length).toEqual(64);
        expect(newBlock2.hash.length).toEqual(64);
    })
})
/*
    TDD를 작성한다는건

    `그냥 기능 테스트 띡 할려고`

    맞긴함

    편하긴 하지

    근데 더 중요한거는

    오늘 수업 내용이 머릿속에 내가 그려졌냐야

    => 내가 검증할게 무엇인지 순서에 맞게 그려져
*/