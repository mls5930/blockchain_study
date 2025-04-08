import Chain from "@core/chain/chain"
import Block from "@core/block/block";
import { GENESIS } from "@core/config";

// 우리가 어제 구현했던 블록 채굴 기능을 이용하여 채굴 이후 상황을 만들고 체인에 추가해보자
describe("Chain 구현", () => {
    let chain: Chain;
    let newBlock: Block;
    let data = ['tx01']
    beforeEach(() => {
        chain = new Chain();
    })

    it("체인 조회하면, 제네시스 블록이 포함되어 있어야 한다.", () => {
        const blocks = chain.get();
        const blocksLength = chain.length();
        // const latestBlock = chain.latestBlock();

        // 현재 체인은 배열인가?
        expect(Array.isArray(blocks)).toBe(true);
        // 현재 제네시스 블록만 존재하는가?
        expect(blocksLength).toBe(1);
        // console.log(latestBlock);
    })

    it("이전 블록과 데이터를 기반으로 난이도를 포함한 블록을 생성할 수 있다.", () => {
        // 세 번째 인자는 앞서 비트코인 난이도 주기의 실제 기준인 2,016개를 예로 든거다. 지금은 
        newBlock = Block.generateBlock(GENESIS, data, GENESIS);
        const addedBlock = chain.addToChain(newBlock);

        expect(chain.length()).toBe(2); // 체인 길이가 이제 2가 되어야겠죠?
        // 가장 최근 블록이 추가한 블록과 동일해야 함.
        expect(addedBlock).toEqual(newBlock);
        // 해시 연결 확인
        expect(chain.get()[1].previousHash).toEqual(GENESIS.hash);
    })

    it("체인에서 특정 높이의 블록을 조회할 수 있는가?", () => {
        const block0 = chain.getBlockByHeight(0);
        console.log(block0);
    })

    it("체인에서 특정 해시값의 블록을 조회할 수 있는가?", () => {
        const target = chain.getBlockByHeight(0);
        const findByHash = chain.getBlockByHash(target.hash);
        console.log(findByHash);
    })
})