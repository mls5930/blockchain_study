import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { IChain } from "@core/interface/chain.interface";

class Chain implements IChain {

    private chain: Block[] = [GENESIS];

    get(): Block[] {
        return this.chain
    }
    length(): number {
        return this.chain.length;
    }
    latestBlock(): Block {
        return this.chain[this.length() - 1];
    }
    // 블록이 채굴되었을 때 이후
    // 반환값은 최신 블록
    addToChain(receivedBlock: Block): Block {
        this.chain.push(receivedBlock);
        return this.latestBlock();
    }

    // 특정 블록을 찾아야 되는 시점에서 필요한 메서드들 구현
    getBlock(callbackFn: (block: Block) => boolean): Block {
        const findBlock = this.chain.find(callbackFn);
        if(!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
        return findBlock;
    }

    // 블록의 높이를 조회
    getBlockByHeight(height: number): Block {
        return this.getBlock((block: Block) => block.height === height);
    }

    // 블록의 해시로 조회
    getBlockByHash(hash: string): Block {
        return this.getBlock((block: Block) => block.hash === hash);
    }

    replaceChain(receivedChain: Block[]): { isError: boolean; value: string; } {
        // 상대방에게서 받은 체인에서 마지막 블록 가져옴
        const lastReceivedBlock: Block = receivedChain[receivedChain.length - 1];

        // 내 체인에서 마지막 블록 가져옴
        const latestBlock: Block = this.latestBlock();

        // 상대방 블록 순번을 통해서 비교합니다
        if(lastReceivedBlock.height === 0) {
            return { isError: true, value: "상대방의 체인은 제네시스 블록임" }
        }

        // 상대방의 체인이 내거보다 짧거나 같으면 무시
        if(lastReceivedBlock.height <= latestBlock.height) {
            return { isError: true, value: "상대방의 체인이 짧거나 같음" }
        }

        // 결국 여기까지 온건 상대방의 체인이 나보다 길다는 것.
        this.chain = receivedChain;
        return {isError: false, value: undefined}
    }
}

export default Chain

  // // 특정 블록을 찾아야 되는 시점에서 필요한 메서드들 구현
    // getBlock(callbackFn: (block: Block) => boolean): Block {
    //     const findBlock = this.chain.find(callbackFn);
    //     if(!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
    //     return findBlock;
    // }

    // // 블록의 높이를 조회
    // getBlockByHeight(height: number): Block {
    //     // return this.getBlock((block: Block) => block.height === height);
    //     const findBlock = this.chain.find((block)=> block.height === height);
    //     if(!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
    //     return findBlock
    // }

    // // 블록의 해시로 조회
    // getBlockByHash(hash: string): Block {
    //     // return this.getBlock((block: Block) => block.hash === hash);
    //     const findBlock = this.chain.find((block)=> block.hash === hash);
    //     if(!findBlock) throw new Error("찾은 블록이 없어 ㅠ");
    //     return findBlock;
    // }