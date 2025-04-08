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

}

export default Chain
